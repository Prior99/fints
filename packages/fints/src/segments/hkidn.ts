import { Format } from "../format";
import { SegmentClass } from "./segment";
import { COUNTRY_CODE } from "../constants";

export class HKIDNProps {
    public blz: string;
    public name: string;
    public systemId?: string;
    public customerId?: number;
    public segNo: number;
}

/**
 * HKIDN (Identifikation)
 * Section C.3.1.2
 */
export class HKIDN extends SegmentClass(HKIDNProps) {
    public type = "HKIDN";

    protected defaults() {
        this.version = 2;
        this.systemId = "0";
        this.customerId = 1;
    }

    protected serialize() {
        const { blz, name, systemId, customerId } = this;
        return [
            [Format.num(COUNTRY_CODE), blz],
            Format.stringEscaped(name),
            systemId,
            Format.num(customerId),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
