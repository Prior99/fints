import { SegmentClass } from "./segment";
import { Format } from "../format";
import { SECURITY_BOUNDARY, SECURITY_SUPPLIER_ROLE, COUNTRY_CODE, SECURITY_FUNCTION } from "../constants";

export class HNSHKProps {
    public segNo: number;
    public secRef: number;
    public blz: string;
    public name: string;
    public systemId: string;
    public profileVersion: number;
    public securityFunction?: string;
}

/**
 * HNSHK (Signaturkopf)
 * Section B.5.1
 */
export class HNSHK extends SegmentClass(HNSHKProps) {
    public type = "HNSHK";

    protected defaults() {
        this.version = 4;
        this.securityFunction = SECURITY_FUNCTION;
    }

    protected serialize() {
        const { secRef, blz, name, systemId, profileVersion, securityFunction } = this;
        return [
            ["PIN", Format.num(profileVersion)],
            securityFunction,
            Format.num(secRef),
            Format.num(SECURITY_BOUNDARY),
            Format.num(SECURITY_SUPPLIER_ROLE),
            [Format.num(1), Format.empty(), systemId],
            Format.num(1),
            [Format.num(1), Format.date(), Format.time()],
            [Format.num(1), Format.num(999), Format.num(1)],
            [Format.num(6), Format.num(10), Format.num(16)],
            [Format.num(COUNTRY_CODE), blz, name, "S", Format.num(0), Format.num(0)],
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
