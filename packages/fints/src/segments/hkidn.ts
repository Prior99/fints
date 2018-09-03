import { Format } from "../format";
import { SegmentClass } from "./segment";

export class HKIDNProps {
    public blz: string;
    public name: string;
    public systemId = 0;
    public customerId = 1;
    public segNo: number;
}

/**
 * HKIDN (Identifikation)
 * Section C.3.1.2
 */
export class HKIDN extends SegmentClass(HKIDNProps) {
    public type = "HKIDN";
    public version = 2;

    protected serialize() {
        const { segNo, blz, name, systemId, customerId } = this;
        return [
            Format.blz(blz),
            Format.stringEscaped(name),
            Format.number(systemId),
            Format.number(customerId),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
