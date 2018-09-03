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
    public version = 1;

    protected deserialize() {
        return [ Format.number(this.msgNo) ];
    }
}
