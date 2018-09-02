import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKWPDConfiguration {
    segNo: number;
    version: number;
    account: string;
}

export class HKWPD extends Segment {
    public type = "HKWPD";
    public version: number;

    constructor({ segNo, version, account }: HKWPDConfiguration) {
        super(segNo, [ account ]);
        this.version = version;
    }
}
