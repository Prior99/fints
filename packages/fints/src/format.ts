import { format } from "date-fns";
import { SEPAAccount } from "./types";
import { escapeFinTS, leftPad } from "./utils";
import { COUNTRY_CODE, HEADER_LENGTH } from "./constants";

export const Format = {
    date(date?: Date) {
        const dateToFormat = date ? date : new Date();
        return format(dateToFormat, "YYYYMMDD");
    },
    stringWithLength(str: string) { return `@${str.length}@${str}`; },
    bool(value: boolean) { return value ? "J" : ""; },
    sepaDescriptor() {
        return "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.001.03";
    },
    num(num: number): string { return `${num}`.replace(/\./, ","); },
    stringEscaped(str: string) {
        if (!str) { return ""; }
        return escapeFinTS(str);
    },
    dig(num: number) { return leftPad(String(num), 12); },
    time(date?: Date) {
        const dateToFormat = date ? date : new Date();
        return format(dateToFormat, "HHMMss");
    },
    empty() { return ""; },
    jn(bool: boolean) { return bool ? "J" : "N"; },
};
