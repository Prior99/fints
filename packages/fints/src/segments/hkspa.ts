import { Format } from "../format";
import { SegmentClass, Segment } from "./segment";

export class HKSPAProps {
    public blz?: string;
    public subAccFeature?: string;
    public accNo?: number;
    public segNo: number;
}
/**
 * HKSPA (SEPA-Kontoverbindung anfordern)
 * Section C.10.1.3
 */
export class HKSPA extends SegmentClass(HKSPAProps) {
    public static headerLength = 29;

    public type = "HKSPA";
    public version = 1;

    protected serialize() {
        const { segNo, accNo, subAccFeature, blz } = this;
        return [
            Format.accountFull(blz, accNo, subAccFeature),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
