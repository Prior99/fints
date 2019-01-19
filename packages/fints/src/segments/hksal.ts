import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";
import { COUNTRY_CODE } from "../constants";

export class HKSALProps {
    public segNo: number;
    public version: number;
    public account: SEPAAccount;
    public touchdown: string;
}

/**
 * HKSAL (Saldenabfrage)
 * Section C.2.1.2.2
 */
export class HKSAL extends SegmentClass(HKSALProps) {
    public type = "HKSAL";

    protected serialize() {
        const { version, account, touchdown } = this;
        const { iban, bic, accountNumber, subAccount, blz } = account;
        if (![4, 5, 6, 7].includes(version)) {
            throw new Error(`Unsupported HKSAL version ${version}.`);
        }
        const serializedAccount = version === 7 ?
            [iban, bic, accountNumber, subAccount, String(COUNTRY_CODE), blz] :
            [accountNumber, subAccount, String(COUNTRY_CODE), blz];
        return [
            serializedAccount,
            Format.jn(false),
            Format.empty(),
            Format.stringEscaped(touchdown),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
