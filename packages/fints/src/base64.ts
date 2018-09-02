import { decode, encode } from "iconv-lite";

export function encodeBase64(input: string): string {
    return Buffer.from(encode(input, "ISO-8859-1")).toString("base64");
}

export function decodeBase64(input: string): string {
    return decode(Buffer.from(input, "base64"), "ISO-8859-1");
}
