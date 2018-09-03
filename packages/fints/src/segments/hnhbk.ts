import { Format } from "../format";
import { SegmentClass } from "./segment";

export class HNHBKProps {
    public msgLength: number;
    public dialogId: number;
    public msgNo: number;
    public segNo: number;
}

/**
 * HNHBK (Nachrichtenkopf)
 * Section B.5.2
 */
export class HNHBK extends SegmentClass(HNHBKProps) {
    public type = "HNHBK";
    public version = 3;

    protected serialize() {
        const { msgLength, dialogId, msgNo } = this;
        return [
            Format.dialogMsgLength(msgLength, dialogId, msgNo),
            Format.number(300),
            Format.number(dialogId),
            Format.number(msgNo),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
