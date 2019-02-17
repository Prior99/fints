import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";

export class HKCDBProps {
    public segNo: number;
    public version: number;
    public account: SEPAAccount;
    public painFormats: string[];
    public touchdown: string;
}

/**
 * HKCDB (SEPA-Dauerauftragsbestand abrufen)
 * Section C.10.2.3.4
 */
export class HKCDB extends SegmentClass(HKCDBProps) {
    public type = "HKCDB";

    protected serialize() {
        const { account, touchdown, painFormats } = this;
        const { iban, bic } = account;
        const pain0101: string = painFormats.find(x => x.startsWith("urn") && x.indexOf("pain.001.001.03") !== -1);
        const pain0103: string = painFormats.find(x => x.startsWith("urn") && x.indexOf("pain.001.003.03") !== -1);
        return [
            [iban, bic],
            pain0101 || pain0103,
            Format.empty(),
            Format.empty(),
            Format.stringEscaped(touchdown),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
