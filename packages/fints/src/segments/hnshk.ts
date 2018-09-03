import { SegmentClass } from "./segment";
import { Format } from "../format";
import { SECURITY_BOUNDARY, SECURITY_SUPPLIER_ROLE, COUNTRY_CODE, SECURITY_FUNCTION } from "../constants";

export class HNSHKProps {
    public segNo: number;
    public secRef: number;
    public blz: string;
    public name: string;
    public systemId: number;
    public profileVersion: number;
    public securityFunction?: string;
}

/**
 * HNSHK (Signaturkopf)
 * Section B.5.1
 */
export class HNSHK extends SegmentClass(HNSHKProps) {
    public type = "HNSHK";
    public version = 4;
    public securityFunction = SECURITY_FUNCTION;

    protected serialize() {
        const { segNo, secRef, blz, name, systemId, profileVersion, securityFunction } = this;
        return [
            `PIN:${profileVersion}`,
            securityFunction,
            Format.number(secRef),
            Format.number(SECURITY_BOUNDARY),
            Format.number(SECURITY_SUPPLIER_ROLE),
            `1::${systemId}`,
            Format.number(1),
            `1:${Format.dateTime(new Date())}`,
            "1:999:1",
            "6:10:16",
            `${COUNTRY_CODE}:${blz}:${name}:S:0:0`,
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
