import { format } from "date-fns";
import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKCCSConfiguration {
    segNo: number;
    painMsg: string;
    account: SEPAAccount;
}

export class HKCCS extends Segment {
    public type = "HKCCS";
    public version = 1;

    constructor({ segNo, account, painMsg }: HKCCSConfiguration) {
        super(segNo, [
            `${account.iban}:${account.bic}`,
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.001.03",
            `@${painMsg.length}@${painMsg}`,
        ]);
    }
}
