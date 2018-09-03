import { format } from "date-fns";
import { SEPAAccount } from "./sepa-account";
import { escapeFinTS, leftPad } from "./utils";
import { COUNTRY_CODE, HEADER_LENGTH } from "./constants";

export const Format = {
    date(date?: Date) {
        const dateToFormat = date ? date : new Date();
        return format(dateToFormat, "YYYYMMDD");
    },
    stringWithLength(str: string) {
        return `@${str.length}@${str}`;
    },
    account(account: SEPAAccount) {
        return `${account.iban}:${account.bic}`;
    },
    bool(value: boolean) {
        return value ? "J" : "";
    },
    sepaDescriptor() {
        return "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.001.03";
    },
    controlSum(controlSum: number, currency: string) {
        return `${String(controlSum).replace(/\./, ",")}:${currency}`;
    },
    number(num: number): string {
        return `${num}`;
    },
    stringEscaped(str: string) {
        if (!str) { return ""; }
        return escapeFinTS(str);
    },
    blz(blz: string) {
        return `${COUNTRY_CODE}:${blz}`;
    },
    accountFull(blz: string, accNo: number, subAccFeature: string) {
        if (typeof accNo === "undefined") { return ""; }
        return `${accNo}:${subAccFeature}:${COUNTRY_CODE}:${blz}`;
    },
    dialogMsgLength(msgLength: number, dialogId: number, msgNo: number) {
        if (String(msgLength).length !== 12) {
            const length = msgLength + HEADER_LENGTH + String(dialogId).length + String(msgNo).length;
            return leftPad(String(length), 12);
        }
        return String(msgLength);
    },
    pinTan(pin: string, tan: string) {
        return `${escapeFinTS(pin)}:${escapeFinTS(tan)}`;
    },
    dateTime(date?: Date) {
        const dateToFormat = date ? date : new Date();
        return `${format(dateToFormat,"YYYYMMDD")}:${format(dateToFormat, "HHMMss")}`;
    },
};
