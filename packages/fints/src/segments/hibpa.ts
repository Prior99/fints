import { Parse } from "../parse";
import { SegmentClass } from "./segment";

export class HIBPAProps {
    public segNo: number;
    public bpdVersion: number;
    public countryCode: number;
    public blz: string;
    public bankName: string;
    public transactionTypeCount: number;
    public supportedLanguages: number[];
    public supportedHbciVersions: number[];
}

/**
 * HIBPA (Bankparameter allgemein)
 * Section D.2
 */
export class HIBPA extends SegmentClass(HIBPAProps) {
    public type = "HIBPA";

    protected defaults() {
        this.version = 3;
    }

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [
            [ bpdVersion ],
            [ countryCode, blz ],
            [ bankName ],
            [ transactionTypeCount ],
            supportedLanguages,
            supportedHbciVersions,
        ] = input;
        this.bpdVersion = Parse.num(bpdVersion as string);
        this.countryCode = Parse.num(countryCode);
        this.blz = blz;
        this.bankName = bankName as string;
        this.transactionTypeCount = Parse.num(transactionTypeCount as string);
        this.supportedLanguages = supportedLanguages.map(Parse.num);
        this.supportedHbciVersions = supportedHbciVersions.map(Parse.num);
    }
}
