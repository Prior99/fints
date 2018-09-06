import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";

export class HKENDProps {
    public segNo: number;
    public dialogId: string;
}

export class HKEND extends SegmentClass(HKENDProps) {
    public type = "HKEND";

    protected defaults() {
        this.version = 1;
    }

    protected serialize() {
        return [ this.dialogId ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
