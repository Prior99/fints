const detectionRegex = /(\d\d)(.*?)\?/g;

export function is86Structured(input: string) {
    const matches: RegExpExecArray[] = [];
    let lastMatch: RegExpExecArray;
    do {
        lastMatch = detectionRegex.exec(input);
        matches.push(lastMatch);
    } while (lastMatch);
    if (matches.length === 0) { return false; }
    const results = matches.map(match => ({ code: Number(match[1]), value: match[2] }));
    if (results.some(result => isNaN(result.code))) { return false; }
    return false;
}

export interface PaymentReference {
    raw: string;
    iban?: string;
    bic?: string;
    endToEndRef?: string;
    customerRef?: string;
    mandateRef?: string;
    creditorId?: string;
    originalTurnover?: string;
    interestCompensation?: string;
    paymentReference?: string;
    divergingPrincipal?: string;
    bank?: string;
    back?: string;
    originatorId?: string;
    date?: Date;
    tan?: {
        num: number;
        value: string;
    };
}

export interface StructuredDescription {
    reference: PaymentReference;
    name: string;
    iban: string;
    text: string;
    bic: string;
}

export interface Section {
    code: number;
    content: string;
}

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

export function parsePaymentReferenceTan(content: string) {
    const groups = /(\d+)\.\s*TAN\s+(.*)/.exec(content);
    if (!groups){ return; }
    return {
        num: Number(groups[1]),
        value: groups[2],
    };
}

export function assemblePaymentReference(references: Section[]): PaymentReference {
    let lastIdentifiedAttribute: keyof PaymentReference;
    const result: PaymentReference = { raw: "" };
    const add = (name: keyof PaymentReference, content: string) => {
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
            else if (content.startsWith("SVWZ+")) { add("paymentReference", content.substr(5)); }
            else if (content.startsWith("ABWA+")) { add("divergingPrincipal", content.substr(5)); }
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

export function parse86Structured(input: string) {
    let iban: string;
    let text: string;
    let bic: string;
    let primaNota: string;
    let currentContent = "";
    let inHeader = true;
    let sectionCode: number;
    const paymentReferences: Section[] = [];
    const names: Section[] = [];

    const flushHeader = () => {
        sectionCode = Number(currentContent);
        currentContent = "";
        inHeader = false;
    };

    const flushSection = () => {
        if (sectionCode === 0) {
            text = currentContent;
        } else if (sectionCode === 10) {
            primaNota = currentContent;
        } else if ((sectionCode >= 20 && sectionCode < 30) || (sectionCode >= 60 && sectionCode <= 63)) {
            paymentReferences.push({ code: sectionCode, content: currentContent });
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
    flushSection();

    const paymentReference = assemblePaymentReference(paymentReferences);
    const name = names
        .sort((a, b) => a.code - b.code)
        .map(recipient => recipient.content)
        .join("");

    return { paymentReference, name, iban, text, bic, primaNota };
}
