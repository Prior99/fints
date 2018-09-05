export function parse(input: string): string[][][] {
    if (input[input.length - 1] !== "'") {
        throw new Error(`String must end with "'"`);
    }

    const segments: string[][][] = [];
    let groups: string[][] = [];
    let elements: string[] = [];
    let str = "";
    let escapeActive = false;

    const flushSegment = () => {
        flushGroup();
        segments.push(groups);
        groups = [];
    };

    const flushGroup = () => {
        flushElement();
        groups.push(elements);
        elements = [];
    };

    const flushElement = () => {
        elements.push(str);
        str = "";
    };

    for (let i = 0; i < input.length; ++i) {
        const character = input.charAt(i);
        // If the last character was a questionmark, this character is escaped.
        if (escapeActive) {
            if (![":", "'", "+", "?", "@"].includes(character)) {
                throw new Error(`Unexpected escape sequence "?${character}" at ${i}`);
            }
            str += character;
            escapeActive = false;
            continue;
        }
        // Handle control characters or append default characters to string.
        switch (character) {
            case "@":
                i++;
                let lengthString = "";
                for (; i < input.length; ++i) {
                    const subCharacter = input.charAt(i);
                    if (subCharacter === "@") { break; }
                    lengthString += subCharacter;
                }
                i++;
                const endIndex = i + Number(lengthString);
                for (; i < endIndex; ++i) {
                    str += input.charAt(i);
                }
                i--;
                break;
            case "?":
                escapeActive = true;
                break;
            case "'":
                flushSegment();
                break;
            case "+":
                flushGroup();
                break;
            case ":":
                // An ":" was encountered, flush the current group.
                flushElement();
                break;
            default:
                str += character;
                break;
        }
    }

    return segments;
}

export function leftPad(str: string, count: number, character = "0"): string {
    while (str.length < count) { str = `${character}${str}`; }
    return str;
}

export function escapeFinTS(content: string): string {
    if (typeof content === "undefined") { return ""; }
    return content
        .replace(/\?/g, "??")
        .replace(/\+/g, "?+")
        .replace(/:/g, "?:")
        .replace(/'/g, "?'")
        .replace(/@/g, "?@");
}

export function unescapeFinTS(content: string): string {
    if (typeof content === "undefined") { return ""; }
    return content
        .replace(/\?\?/g, "?")
        .replace(/\?\+/g, "+")
        .replace(/\?:/g, ":")
        .replace(/\?'/g, "'")
        .replace(/\?@/g, "@");
}
