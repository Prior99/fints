import { SegmentClass } from "./segment";
import { Parse } from "../parse";

export class HISALSProps {
    public segNo: number;
    public maxRequestCount: number;
    public minSignatures: number;
}

/**
 * HISALS (Saldenabfrage Parameter)
 * Section C.2.1.2
 */
export class HISALS extends SegmentClass(HISALSProps) {
    public type = "HISALS";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [ [ maxRequestCount ], [ minSignatures ] ] = input;
        this.minSignatures = Parse.num(minSignatures as string);
        this.maxRequestCount = Parse.num(maxRequestCount as string);
    }
}
