import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HKTABConfiguration {
    segNo: number;
}

export class HKTAB extends Segment {
    public type = "HKTAB";
    public version = 5;

    constructor({ segNo }: HKTABConfiguration) {
        super(segNo, [ "0", "A" ]);
    }
}
