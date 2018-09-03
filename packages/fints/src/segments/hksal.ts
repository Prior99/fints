import { SegmentClass } from "./segment";
import { SEPAAccount } from "../sepa-account";

export class HKSALProps {
    public segNo: number;
    public version: number;
    public account: string;
}

/**
 * HKSAL (Konto Saldo anfordern)
 * Section C.2.1.2
 */
export class HKSAL extends SegmentClass(HKSALProps) {
    public type = "HKSAL";
    public version = 1;

    protected serialize() {
        return [ this.account, "N" ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
