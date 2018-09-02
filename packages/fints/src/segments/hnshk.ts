import { format } from "date-fns";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HNSHKConfiguration {
    segNo: number;
    secRef: number;
    blz: string;
    name: string;
    systemId: number;
    profileVersion: number;
    securityFunction?: string;
}

export class HNSHK extends Segment {
    public static securityFunction = "999";
    public static securityBoundary = 1;
    public static securitySupplierRole = 1;

    public type = "HNSHK";
    public version = 4;

    constructor({ segNo, secRef, blz, name, systemId, profileVersion, securityFunction }: HNSHKConfiguration) {
        super(segNo, [
            `PIN:${profileVersion}`,
            securityFunction || HNSHK.securityFunction,
            secRef,
            HNSHK.securityBoundary,
            HNSHK.securitySupplierRole,
            `1::${systemId}`,
            1,
            `1:${format(new Date(),"YYYYMMDD")}:${format(new Date(), "HHMMss")}`,
            "1:999:1",
            "6:10:16",
            `${HNSHK.countryCode}:${blz}:${name}:S:0:0`,
        ]);
    }
}
