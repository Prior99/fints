import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HKTANConfiguration {
    segNo: number;
    process: string;
    version: number;
    aref: string;
    medium: boolean;
}

export class HKTAN extends Segment {
    public type = "HKTAN";
    public version: number;

    constructor(config: HKTANConfiguration) {
        super(config.segNo, [ HKTAN.buildData(config) ]);
        this.version = config.version;
    }

    private static buildData({ segNo, process, aref, medium, version }: HKTANConfiguration) {
        if (!["2", "4"].includes(process)) {
            throw new Error(`HKTAN process ${process} not implemented.`);
        }
        if (![3, 4, 5, 6].includes(version)) {
            throw new Error(`HKTAN version ${process} not implemented.`);
        }
        if (process === "4") {
            if (medium) {
                if (version === 3) { return [process, "", "", "", "", "", "", "", medium]; }
                if (version === 4) { return [process, "", "", "", "", "", "", "", "", medium]; }
                if (version === 5) { return [process, "", "", "", "", "", "", "", "", "", "", medium]; }
                if (version === 6) { return [process, "", "", "", "", "", "", "", "", "", medium]; }
            }
            else { return [process]; }
        } else if (process === "2") {
            if (version === 6) { return [process, "", "", "", aref, "N"]; }
            if (version === 5) { return [process, "", "", "", aref, "", "N"]; }
            if (version === 3 || version === 4) { return [process, "", aref, "", "N"]; }
        }
    }
}
