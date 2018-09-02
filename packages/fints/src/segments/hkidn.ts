import { escapeFinTS } from "../escape";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HKIDNConfiguration {
    blz: string;
    name: string;
    systemId?: number;
    customerId?: number;
    segNo: number;
}

export class HKIDN extends Segment {
    public type = "HKIDN";
    public version = 2;

    constructor({ segNo, blz, name, systemId, customerId }: HKIDNConfiguration) {
        super(segNo, [
            `${HKIDN.countryCode}:${blz}`,
            escapeFinTS(name),
            systemId || 0,
            customerId || 1,
        ]);
    }
}
