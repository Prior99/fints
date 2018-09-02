export function leftPad(str: string, count: number, character = "0"): string {
    while (str.length < count) { str = `${character}${str}`; }
    return str;
}
