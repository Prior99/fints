import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HKSYNConfiguration {
    segNo: number;
    mode?: number;
}

export class HKSYN extends Segment {
    public static syncModeNewCustomerId = 0;
    public static syncModeLastMsgNumber = 1;
    public static syncModeSignatureId = 2;

    public type = "HKSYN";
    public version = 3;

    constructor({ segNo, mode }: HKSYNConfiguration) {
        super(segNo, [ mode || HKSYN.syncModeNewCustomerId ]);
    }
}
