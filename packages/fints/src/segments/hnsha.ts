import { format } from "date-fns";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";
import { escapeFinTS } from "../escape";

export interface HNSHAConfiguration {
    segNo: number;
    secRef: number;
    pin: string;
    tan: string;
}

export class HNSHA extends Segment {
    public type = "HNSHA";
    public version = 2;

    constructor({ segNo, secRef, pin, tan }: HNSHAConfiguration) {
        super(segNo, [
            secRef,
            "",
            `${escapeFinTS(pin)}:${escapeFinTS(tan)}`,
        ]);
    }
}
