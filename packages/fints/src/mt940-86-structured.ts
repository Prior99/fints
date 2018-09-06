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
    iban: string;
    text: string;
    bic: string;
}

export function parse86Structured(input: string) {
    let paymentReference = "";
    let iban: string;
    let text: string;
    let bic: string;
    let currentContent = "";
    let inHeader = true;
    let currentSection: number;

    const flushHeader = () => {
        currentSection = Number(currentContent);
        currentContent = "";
        inHeader = false;
    };

    for (let i = 0; i < input.length; ++i) {
        const character = input[i];
        if (character === "?") {

            continue;
        }
        currentContent += character;
        if (inHeader && currentContent.length === 2) {
            flushHeader();
            continue;
        }
    }
}
