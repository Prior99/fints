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

export interface StructuredDescription {
    paymentReference: string;
    recipientName: string;
    iban: string;
    text: string;
    bic: string;
}

export function parse86Structured(input: string) {
    let iban: string;
    let text: string;
    let bic: string;
    let primaNota: string;
    let currentContent = "";
    let inHeader = true;
    let sectionCode: number;
    const paymentReferences: { code: number, content: string }[] = [];
    const recipientNames: { code: number, content: string }[] = [];

    const flushHeader = () => {
        sectionCode = Number(currentContent);
        currentContent = "";
        inHeader = false;
    };

    const flushSection = () => {
        inHeader = true;
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
            recipientNames.push({ code: sectionCode, content: currentContent });
        }
        currentContent = "";
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

    const paymentReference = paymentReferences
        .sort((a, b) => a.code - b.code)
        .map(reference => reference.content)
        .join("");
    const recipientName = recipientNames
        .sort((a, b) => a.code - b.code)
        .map(recipient => recipient.content)
        .join("");

    return { paymentReference, recipientName, iban, text, bic };
}
