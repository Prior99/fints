import { SegmentClass } from "./segment";
import { SEPAAccount } from "../sepa-account";
import { Parse } from "../parse";

export class HIKAZProps {
    public segNo: number;
    public bookedTransactions: string;
    public pendingTransactions: string;
}

/**
 * HIKAZ (Kontoumsätze rückmelden/Zeitraum)
 * Section C.2.1.1.1.1
 */
export class HIKAZ extends SegmentClass(HIKAZProps) {
    public type = "HIKAZ";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: (string[] | string)[]) {
        const [ bookedTransactions, pendingTransactions ] = input;
        this.pendingTransactions = pendingTransactions as string;
        this.bookedTransactions = bookedTransactions as string;
    }
}
