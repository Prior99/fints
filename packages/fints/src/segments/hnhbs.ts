import { SegmentClass } from "./segment";
import { Format } from "../format";

export class HNHBSProps {
    public segNo: number;
    public msgNo: number;
}

/**
 * HNHBS (Nachrichtenabschluss)
 * Section B.5.3
 */
export class HNHBS extends SegmentClass(HNHBSProps) {
    public type = "HNHBS";

    protected defaults() {
        this.version = 1;
    }

    protected serialize() {
        return [ Format.num(this.msgNo) ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
