import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HNHBKConfiguration {
    msgLength: number;
    dialogId: number;
    msgNo: number;
}

export class HNHBK extends Segment {
    public static headerLength = 29;

    public type = "HNHBK";
    public version = 3;

    constructor({ msgLength, dialogId, msgNo }: HNHBKConfiguration) {
        super(1, [
            HNHBK.getMsgLength(msgLength, dialogId, msgNo),
            300,
            dialogId,
            msgNo,
        ]);
    }

    private static getMsgLength(msgLength: number, dialogId: number, msgNo: number): string {
        if (String(msgLength).length !== 12) {
            const length = msgLength + HNHBK.headerLength + String(dialogId).length + String(msgNo).length;
            return leftPad(String(length), 12);
        }
        return String(msgLength);
    }
}
