import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../sepa-account";

export class HKDSEProps {
    public account: SEPAAccount;
    public painMsg: string;
    public segNo: number;
}

/**
 * HKDSE (Einreichung terminierter SEPA-Einzellastschrift)
 * Section C.10.2.5.4.1
 */
export class HKDSE extends SegmentClass(HKDSEProps) {
    public type = "HKDSE";
    public version = 1;

    protected serialize() {
        const { segNo, account, painMsg } = this;
        return [
            [account.iban, account.bic],
            Format.sepaDescriptor(),
            Format.stringWithLength(painMsg),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
