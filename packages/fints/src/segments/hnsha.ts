import { SegmentClass } from "./segment";
import { Format } from "../format";

export class HNSHAProps {
    public segNo: number;
    public secRef: number;
    public pin: string;
    public tan: string;
}

/**
 * HNSHA (Signaturabschluss)
 * Section B.5.2
 */
export class HNSHA extends SegmentClass(HNSHAProps) {
    public type = "HNSHA";

    protected defaults() {
        this.version = 2;
    }

    protected serialize() {
        const { secRef, pin, tan } = this;
        return [
            Format.num(secRef),
            Format.empty(),
            tan ? [pin, tan] : pin,
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
