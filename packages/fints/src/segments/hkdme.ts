import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../sepa-account";

export class HKDMEProps {
    public account: SEPAAccount;
    public painMsg: string;
    public segNo: number;
    public controlSum: number;
    public currency: string;
    public bookAsSingle: boolean;
}

/**
 * HKDME (Einreichung terminierter SEPA-Sammellastschrift)
 * Section C.10.3.2.2.1
 */
export class HKDME extends SegmentClass(HKDMEProps) {
    public type = "HKDME";
    public version = 1;

    protected serialize() {
        const { segNo, account, painMsg, controlSum, currency, bookAsSingle } = this;
        return [
            Format.account(account),
            Format.controlSum(controlSum, currency),
            Format.bool(bookAsSingle),
            Format.sepaDescriptor(),
            Format.stringWithLength(painMsg),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
