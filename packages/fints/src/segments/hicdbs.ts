import { SegmentClass } from "./segment";
import { Parse } from "../parse";

export class HICDBSProps {
    public segNo: number;
    public maxRequestCount: number;
    public minSignatures: number;
}

/**
 * HICDBS (SEPA-Dauerauftragsbestand Parameter)
 * Section C.10.2.3.4
 */
export class HICDBS extends SegmentClass(HICDBSProps) {
    public type = "HICDBS";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [ [ maxRequestCount ], [ minSignatures ] ] = input;
        this.minSignatures = Parse.num(minSignatures);
        this.maxRequestCount = Parse.num(maxRequestCount);
    }
}
