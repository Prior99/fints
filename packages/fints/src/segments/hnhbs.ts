import { format } from "date-fns";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";
import { escapeFinTS } from "../escape";

export interface HNHBSConfiguration {
    segNo: number;
    msgNo: number;
}

export class HNHBS extends Segment {
    public type = "HNHBS";
    public version = 1;

    constructor({ segNo, msgNo }: HNHBSConfiguration) {
        super(segNo, [ `${msgNo}` ]);
    }
}
