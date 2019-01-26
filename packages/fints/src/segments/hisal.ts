import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";
import { Parse } from "../parse";

export class HISALProps {
    public segNo: number;
    public account: SEPAAccount;
    public productName: string;
    public currency: string;
    public bookedBalance: number;
    public pendingBalance: number;
    public creditLimit: number;
    public availableBalance: number;
}

/**
 * HISAL (Saldenrückmeldung)
 * Section C.2.1.2.2
 */
export class HISAL extends SegmentClass(HISALProps) {
    public type = "HISAL";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [
            [ accountNumber, subAccount, _country, blz ],
            [ productName ],
            [ currency ],
            [ _cb, booked ],
            [ _cp, pending ],
            [ dispo ],
            [ available ],
        ] = input;
        this.account = { accountNumber, subAccount, blz, iban: null, bic: null };
        this.productName = productName;
        this.currency = currency;
        this.bookedBalance = Parse.num(booked);
        this.pendingBalance = Parse.num(pending);
        this.creditLimit = Parse.num(dispo);
        this.availableBalance = Parse.num(available);
    }
}
