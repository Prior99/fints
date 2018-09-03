import { Format } from "../format";
import { SegmentClass } from "./segment";
import { LANG_DE, PRODUCT_NAME, PRODUCT_VERSION } from "../constants";

export class HKVVBProps {
    public segNo: number;
    public lang = LANG_DE;
}

/**
 * HKVVB (Verarbeitungsvorbereitung)
 * Section C.3.1.3
 */
export class HKVVB extends SegmentClass(HKVVBProps) {
    public type = "HKVVB";
    public version = 3;

    protected serialize() {
        const { segNo, lang } = this;
        return [
            Format.number(0),
            Format.number(0),
            lang,
            Format.stringEscaped(PRODUCT_NAME),
            Format.stringEscaped(PRODUCT_VERSION),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
