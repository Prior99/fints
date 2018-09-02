import { format } from "date-fns";
import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { SEPAAccount } from "../sepa-account";

export interface HKKAZConfiguration {
    segNo: number;
    version: number;
    account: string;
    dateStart: Date;
    dateEnd: Date;
    touchdown: string;
}

export class HKKAZ extends Segment {
    public type = "HKKAZ";
    public version: number;

    constructor({ segNo, version, account, dateEnd, dateStart, touchdown }: HKKAZConfiguration) {
        super(segNo, [
            account,
            "N",
            format(dateStart, "YYYYMMDD"),
            format(dateEnd, "YYYYMMDD"),
            "",
            touchdown ? escapeFinTS(touchdown) : "",
        ]);
        this.version = version;
    }
}
