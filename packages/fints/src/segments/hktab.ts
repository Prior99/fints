import { SegmentClass } from "./segment";
import { Format } from "../format";

export class HKTABProps {
    public segNo: number;
    public tanClass: string;
    public mode: number;
}

/**
 * HKTAB (Verfügbare TAN-Medien ermitteln)
 * Section C.2.1.2
 */
export class HKTAB extends SegmentClass(HKTABProps) {
    public type = "HKTAB";

    protected defaults() {
        this.version = 5;
        this.tanClass = "A";
        this.mode = 0;
    }

    protected serialize() {
        return [ Format.num(this.mode), this.tanClass ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
