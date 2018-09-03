import { Format } from "../format";
import { SegmentClass } from "./segment";
import { SECURITY_SUPPLIER_ROLE, COUNTRY_CODE, COMPRESSION_NONE } from "../constants";

export class HNVSKProps {
    public segNo: number;
    public blz: string;
    public name: string;
    public systemId: number;
    public profileVersion: number;
}

export class HNVSK extends SegmentClass(HNVSKProps) {
    public type = "HNVSK";
    public version = 3;

    protected serialize() {
        const { segNo, blz, name, systemId, profileVersion } = this;
        return [
            `PIN:${profileVersion}`,
            Format.number(998),
            Format.number(SECURITY_SUPPLIER_ROLE),
            `${1}::${systemId}`,
            `1:${Format.dateTime()}`,
            `2:2:13:@8@00000000:5:1`,
            `${COUNTRY_CODE}:${blz}:${name}:S:0:0`,
            Format.number(COMPRESSION_NONE),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
