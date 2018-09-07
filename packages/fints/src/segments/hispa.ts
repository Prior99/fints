import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";

export class HISPAProps {
    public segNo: number;
    public accounts: SEPAAccount[];
}

/**
 * HISPA (SEPA-Kontoverbindung rückmelden)
 * Section C.10.1.3
 */
export class HISPA extends SegmentClass(HISPAProps) {
    public type = "HISPA";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        this.accounts = input.map(([ hasSepa, iban, bic, accountNumber, subAccount, countryCode, blz ]) => ({
            iban, bic, accountNumber, subAccount, blz,
        }));
    }
}
