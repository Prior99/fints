export function escapeFinTS(content: string): string {
    return content
        .replace(/\?/g, "??")
        .replace(/\+/g, "?+")
        .replace(/:/g, "?:")
        .replace(/'/g, "?'")
        .replace(/@/g, "?@");
}

export function unescapeFinTS(content: string): string {
    return content
        .replace(/\?\?/g, "?")
        .replace(/\?\+/g, "+")
        .replace(/\?:/g, ":")
        .replace(/\?'/g, "'")
        .replace(/\?@/g, "@");
}
