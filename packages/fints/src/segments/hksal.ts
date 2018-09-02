import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKSALConfiguration {
    segNo: number;
    version: number;
    account: string;
}

export class HKSAL extends Segment {
    public type = "HKSAL";
    public version = 1;

    constructor({ segNo, version, account }: HKSALConfiguration) {
        super(segNo, [ account, "N" ]);
        this.version = version;
    }
}
