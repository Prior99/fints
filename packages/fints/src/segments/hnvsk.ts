import { format } from "date-fns";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HNVSKConfiguration {
    segNo: number;
    blz: string;
    name: string;
    systemId: number;
    profileVersion: number;
}

export class HNVSK extends Segment {
    public static compressionNone = 0;
    public static securitySupplierRole = 1;

    public type = "HNVSK";
    public version = 3;

    constructor({ segNo, blz, name, systemId, profileVersion }: HNVSKConfiguration) {
        super(segNo, [
            `PIN:${profileVersion}`,
            998,
            HNVSK.securitySupplierRole,
            `${1}::${systemId}`,
            `1:${format("YYYYMMDD")}:${format("HHMMss")}`,
            `2:2:13:@8@00000000:5:1`,
            `${HNVSK.countryCode}:${blz}:${name}:S:0:0`,
            HNVSK.compressionNone,
        ]);
    }
}
