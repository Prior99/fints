import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HKSPAConfiguration {
    blz: string;
    subAccFeature: string;
    accNo: number;
    segNo: number;
}

export class HKSPA extends Segment {
    public static headerLength = 29;

    public type = "HKSPA";
    public version = 1;

    constructor({ segNo, accNo, subAccFeature, blz }: HKSPAConfiguration) {
        super(segNo, [
            typeof accNo !== "undefined" ?
                `${accNo}:${subAccFeature}:${HKSPA.countryCode}:${blz}` : "",
        ]);
    }

    private static getMsgLength(msgLength: number, dialogId: string, msgNo: number): string {
        if (String(msgLength).length !== 12) {
            const length = msgLength + HKSPA.headerLength + String(dialogId).length + String(msgNo).length;
            return leftPad(String(length), 12);
        }
        return String(msgLength);
    }
}
