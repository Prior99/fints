export function splitForDataGroups(segment: string) {
    return segment.split(/\+(?<!\?\+)/);
}

export function splitForDataElements(segment: string) {
    return segment.split(/:(?<!\?:)/);
}

export function splitSegment(segment: string): string[][] {
    const dataGroups = splitForDataGroups(segment);
    return dataGroups.map(dataGroup => splitForDataElements(dataGroup));
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
