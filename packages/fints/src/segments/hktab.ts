import { SegmentClass } from "./segment";

export class HKTABProps {
    public segNo: number;
}

/**
 * HKTAB (Verfügbarre TAN-Medien ermitteln)
 * Section C.2.1.2
 */
export class HKTAB extends SegmentClass(HKTABProps) {
    public type = "HKTAB";
    public version = 5;

    protected serialize() {
        return [ "0", "A" ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
