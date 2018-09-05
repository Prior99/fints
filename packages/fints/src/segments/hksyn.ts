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

    protected defaults() {
        this.version = 3;
        this.mode = SYNC_MODE_NEW_CUSTOMER_ID;
    }

    protected serialize() {
        return [ Format.num(this.mode) ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
