import { SegmentClass } from "./segment";

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

    protected deserialize(input: string[][]) {
        const [ bookedTransactions, pendingTransactions ] = input;
        if (pendingTransactions && pendingTransactions[0]) {
            this.pendingTransactions = pendingTransactions[0];
        }
        if (bookedTransactions && bookedTransactions[0]) {
            this.bookedTransactions = bookedTransactions[0];
        }
    }
}
