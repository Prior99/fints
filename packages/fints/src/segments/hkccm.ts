import { SegmentClass } from "./segment";
import { Format } from "../format";
import { SEPAAccount } from "../sepa-account";

export class HKCCMProps {
    public segNo: number;
    public painMsg: string;
    public account: SEPAAccount;
    public controlSum: number;
    public currency: string;
    public bookAsSingle: boolean;
}

/**
 * HKCCM (SEPA-Sammelüberweisung einreichen)
 * Section C.10.3.1.1
 */
export class HKCCM extends SegmentClass(HKCCMProps) {
    public type = "HKCCM";
    public version = 1;

    protected serialize() {
        const { account, painMsg, controlSum, currency, bookAsSingle } = this;
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
