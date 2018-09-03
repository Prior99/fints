import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SEPAAccount } from "../sepa-account";

export class HKCCSProps {
    public segNo: number;
    public painMsg: string;
    public account: SEPAAccount;
}

/**
 * HKCCS (SEPA Überweisung übertragen)
 * Section C.2.1.2
 */
export class HKCCS extends SegmentClass(HKCCSProps) {
    public type = "HKCCS";
    public version = 1;

    protected serialize() {
        const { segNo, account, painMsg } = this;
        return [
            Format.account(account),
            Format.sepaDescriptor(),
            Format.stringWithLength(painMsg),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
