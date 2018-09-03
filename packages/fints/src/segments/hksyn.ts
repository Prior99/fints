import { SYNC_MODE_NEW_CUSTOMER_ID } from "../constants";
import { Format } from "../format";
import { SegmentClass } from "./segment";

export class HKSYNProps {
    public segNo: number;
    public mode?: number;
}

/**
 * HKSYN (Synchronisation)
 * Section C.8.1.2
 */
export class HKSYN extends SegmentClass(HKSYNProps) {
    public type = "HKSYN";
    public version = 3;

    public mode = SYNC_MODE_NEW_CUSTOMER_ID;

    protected serialize() {
        console.log("SYN", this.mode, this);
        return [ Format.number(this.mode) ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
