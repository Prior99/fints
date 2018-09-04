import { Parse } from "../parse";
import { SegmentClass } from "./segment";

export class HIBPAProps {
    public segNo: number;
    public bpdVersion: number;
    public countryCode: number;
    public blz: string;
    public bankName: string;
    public transactionTypeCount: number;
    public lang: number;
    public hbciVersion: number;
}

/**
 * HIBPA (Bankparameter allgemein)
 * Section D.2
 */
export class HIBPA extends SegmentClass(HIBPAProps) {
    public type = "HIBPA";
    public version = 3;

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: (string[] | string)[]) {
        const [ bpdVersion, [ countryCode, blz ], bankName, transactionTypeCount, lang, hbciVersion ] = input;
        this.bpdVersion = Parse.num(bpdVersion as string);
        this.countryCode = Parse.num(countryCode);
        this.blz = blz;
        this.bankName = bankName as string;
        this.transactionTypeCount = Parse.num(transactionTypeCount as string);
        this.lang = Parse.num(lang as string);
        this.hbciVersion = Parse.num(hbciVersion as string);
    }
}
