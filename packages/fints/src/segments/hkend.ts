import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKENDConfiguration {
    segNo: number;
    dialogId: number;
}

export class HKEND extends Segment {
    public type = "HKEND";
    public version = 1;

    constructor({ segNo, dialogId }: HKENDConfiguration) {
        super(segNo, [ dialogId ]);
    }
}
