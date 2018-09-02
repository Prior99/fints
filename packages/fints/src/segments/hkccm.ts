import { format } from "date-fns";
import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKCCMConfiguration {
    segNo: number;
    painMsg: string;
    account: SEPAAccount;
    controlSum: number;
    currency: string;
    bookAsSingle: boolean;
}

export class HKCCM extends Segment {
    public type = "HKCCM";
    public version = 1;

    constructor({ segNo, account, painMsg, controlSum, currency, bookAsSingle }: HKCCMConfiguration) {
        super(segNo, [
            `${account.iban}:${account.bic}`,
            `${String(controlSum).replace(/\./, ",")}:${currency}`,
            bookAsSingle ? "J" : "",
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.001.03",
            `@${painMsg.length}@${painMsg}`,
        ]);
    }
}
