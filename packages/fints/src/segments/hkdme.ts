import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKDMEConfiguration {
    account: SEPAAccount;
    painMsg: string;
    segNo: number;
    controlSum: number;
    currency: string;
    bookAsSingle: boolean;
}

export class HKDME extends Segment {
    public type = "HKDME";
    public version = 1;

    constructor({ segNo, account, painMsg, controlSum, currency, bookAsSingle }: HKDMEConfiguration) {
        super(segNo, [
            `${account.iban}:${account.bic}`,
            `${String(controlSum).replace(/\./, ",")}:${currency}`,
            bookAsSingle ? "J" : "",
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.008.003.02",
            `@${painMsg.length}@${painMsg}`,
        ]);
    }
}
