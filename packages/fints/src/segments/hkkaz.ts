import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../sepa-account";

export class HKKAZProps {
    public segNo: number;
    public version: number;
    public account: string;
    public dateStart: Date;
    public dateEnd: Date;
    public touchdown: string;
}

/**
 * HKKAZ (Kontoumsätze
 * Section C.2.1.1.1.2
 */
export class HKKAZ extends SegmentClass(HKKAZProps) {
    public type = "HKKAZ";
    public version: number;

    protected serialize() {
        const { segNo, version, account, dateEnd, dateStart, touchdown } = this;
        return [
            account,
            "N",
            Format.date(dateStart),
            Format.date(dateEnd),
            "",
            Format.stringEscaped(touchdown),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
