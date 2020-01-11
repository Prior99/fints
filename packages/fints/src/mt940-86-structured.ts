import { Section, PaymentReference, StructuredDescription } from "./types";

const detectionRegex = /(?:^|\?)(..)(.*?)(?:$|\?)/g;

/**
 * Used to sniff whether the 86 section of the MT940 statement list supports the fints structured
 * representation.
 *
 * @param input The string for the 86 section.
 *
 * @return Whether the string is likely structured.
 */
export function is86Structured(input: string) {
    const matches: RegExpExecArray[] = [];
    let lastMatch: RegExpExecArray;
    do {
        lastMatch = detectionRegex.exec(input);
        matches.push(lastMatch);
    } while (lastMatch);
    const results = matches
        .filter(match => match !== null)
        .map(match => ({ code: Number(match[1]), value: match[2] }));
    if (results.length === 0) { return false; }
    if (results.some(result => isNaN(result.code))) { return false; }
    return true;
}

/**
 * Parses a commonly used date format ("DATUM 15.11.2018, 12:00 UHR") into a date
 *
 * @param content The date string to parse.
 *
 * @return The parsed date.
 */
export function parsePaymentReferenceDate(content: string): Date {
    const groups = /DATUM\s+(\d+)\.(\d+)\.(\d+),\s+(\d+)\.(\d+)\s+UHR/.exec(content);
    if (!groups){ return; }
    return new Date(
        Number(groups[3]),
        Number(groups[2]) - 1,
        Number(groups[1]),
        Number(groups[4]),
        Number(groups[5]),
    );
}

/**
 * Parses a commonly format for representing a TAN related to a transaction ("1. TAN 123456").
 *
 * @param content The string to parse.
 *
 * @return The parsed TAN number and TAN iteself.
 */
export function parsePaymentReferenceTan(content: string) {
    const groups = /(\d+)\.\s*TAN\s+(.*)/.exec(content);
    if (!groups){ return; }
    return {
        num: Number(groups[1]),
        value: groups[2],
    };
}

/**
 * If the payment reference follows the SEPA tagging system, parse the information.
 * See: https://tinyurl.com/ycdfx5hd
 *
 * @param references A list of all sections used for payment reference (20 - 29 and 60 - 63).
 *
 * @return A parsed payment reference with all extracted data.
 */
export function assemblePaymentReference(references: Section[]): PaymentReference {
    let lastIdentifiedAttribute: keyof Omit<PaymentReference, "date"|"tan">;
    const result: PaymentReference = { raw: "" };
    const add = (name: keyof Omit<PaymentReference, "date"|"tan">, content: string) => {
        lastIdentifiedAttribute = name;
        result[name] = content;
    };
    references
        .sort((a, b) => a.code - b.code)
        .forEach(({ content }) => {
            if (content.startsWith("IBAN+")) { add("iban", content.substr(5)); }
            else if (content.startsWith("BIC+")) { add("bic", content.substr(5)); }
            else if (content.startsWith("EREF+")) { add("endToEndRef", content.substr(5)); }
            else if (content.startsWith("KREF+")) { add("customerRef", content.substr(5)); }
            else if (content.startsWith("MREF+")) { add("mandateRef", content.substr(5)); }
            else if (content.startsWith("CRED+")) { add("creditorId", content.substr(5)); }
            else if (content.startsWith("DEBT+")) { add("originatorId", content.substr(5)); }
            else if (content.startsWith("COAM+")) { add("interestCompensation", content.substr(5)); }
            else if (content.startsWith("OAMT+")) { add("originalTurnover", content.substr(5)); }
            else if (content.startsWith("SVWZ+")) { add("text", content.substr(5)); }
            else if (content.startsWith("ABWA+")) { add("divergingPrincipal", content.substr(5)); }
            else if (content.startsWith("PURP+")) { add("purpose", content.substr(5)); }
            else if (content.startsWith("BREF+")) { add("back", content.substr(5)); }
            else if (content.startsWith("RREF+")) { add("back", content.substr(5)); }
            else if (content.startsWith("DATUM ")) { result.date = parsePaymentReferenceDate(content); }
            else if (/\d+\.\s*TAN/.test(content)) { result.tan = parsePaymentReferenceTan(content); }
            else if (lastIdentifiedAttribute) { result[lastIdentifiedAttribute] += content; }
            result.raw += content;
            return result;
        });
    return result;
}

/**
 * Parse as much information as possible from the structured 86 section of a MT940 statement list.
 * Use `is86Structured` to sniff whether the payment reference is parsable.
 *
 * @param input The input string for the 86 section to parse.
 *
 * @return The parsed structured description.
 */
export function parse86Structured(input: string): StructuredDescription {
    let iban: string;
    let text: string;
    let bic: string;
    let primaNota: string;
    let currentContent = "";
    let inHeader = true;
    let sectionCode: number;
    const references: Section[] = [];
    const names: Section[] = [];
    // The header has been parsed fully. Store the section code and begin parsing the content.
    const flushHeader = () => {
        sectionCode = Number(currentContent);
        currentContent = "";
        inHeader = false;
    };
    // A questionmark has been encountered, hence the content of the current section is complete.
    // Store the parsed data and continue to read the next header.
    const flushSection = () => {
        if (sectionCode === 0) {
            text = currentContent;
        } else if (sectionCode === 10) {
            primaNota = currentContent;
        } else if ((sectionCode >= 20 && sectionCode < 30) || (sectionCode >= 60 && sectionCode <= 63)) {
            references.push({ code: sectionCode, content: currentContent });
        } else if (sectionCode === 30) {
            bic = currentContent;
        } else if (sectionCode === 31) {
            iban = currentContent;
        } else if (sectionCode >= 32 && sectionCode <= 33) {
            names.push({ code: sectionCode, content: currentContent });
        }
        currentContent = "";
        sectionCode = undefined;
        inHeader = true;
    };
    // Read the string character by character and split it into sections.
    for (let i = 0; i < input.length; ++i) {
        const character = input[i];
        if (character === "?") {
            flushSection();
            continue;
        }
        currentContent += character;
        if (inHeader && currentContent.length === 2) {
            flushHeader();
            continue;
        }
    }
    // After parsing, flush the last section.
    flushSection();
    // The payment reference could have been using tags.
    // Attempt to parse the tags.
    const reference = assemblePaymentReference(references);
    const name = names
        .sort((a, b) => a.code - b.code)
        .map(recipient => recipient.content)
        .join("");
    return { reference, name, iban, text, bic, primaNota };
}
