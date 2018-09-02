import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HKVVBConfiguration {
    segNo: number;
    lang?: number;
}

export class HKVVB extends Segment {
    public static langDE = 1;
    public static langEN = 2;
    public static langFR = 3;
    public static productName = "fints";
    public static productVersion = "0.1";

    public type = "HKVVB";
    public version = 3;

    constructor({ segNo, lang }: HKVVBConfiguration) {
        super(segNo, [
            0,
            0,
            lang || HKVVB.langDE,
            escapeFinTS(HKVVB.productName),
            escapeFinTS(HKVVB.productVersion),
        ]);
    }
}
