import { Format } from "../format";
import { SegmentClass } from "./segment";
import { LANG_DE, PRODUCT_NAME, PRODUCT_VERSION } from "../constants";

export class HKVVBProps {
    public segNo: number;
    public lang?: number;
}

/**
 * HKVVB (Verarbeitungsvorbereitung)
 * Section C.3.1.3
 */
export class HKVVB extends SegmentClass(HKVVBProps) {
    public type = "HKVVB";

    protected defaults() {
        this.version = 3;
        this.lang = LANG_DE;
    }

    protected serialize() {
        const { lang } = this;
        return [
            Format.num(0),
            Format.num(0),
            Format.num(lang),
            Format.stringEscaped(PRODUCT_NAME),
            Format.stringEscaped(PRODUCT_VERSION),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
