import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKDSEConfiguration {
    account: SEPAAccount;
    painMsg: string;
    segNo: number;
}

export class HKDSE extends Segment {
    public type = "HKDSE";
    public version = 1;

    constructor({ segNo, account, painMsg }: HKDSEConfiguration) {
        super(segNo, [
            `${account.iban}:${account.bic}`,
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.008.003.02",
            `@${painMsg.length}@${painMsg}`,
        ]);
    }
}
