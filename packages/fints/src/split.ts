export function splitForDataGroups(segment: string) {
    return segment.split(/\+(?<!\?\+)/);
}

export function splitForDataElements(segment: string) {
    return segment.split(/:(?<!\?:)/);
}
