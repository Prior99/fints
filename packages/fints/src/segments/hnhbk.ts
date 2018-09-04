import { Format } from "../format";
import { Parse } from "../parse";
import { SegmentClass } from "./segment";
import { HEADER_LENGTH, HBCI_VERSION } from "../constants";

export class HNHBKProps {
    public msgLength: number;
    public dialogId: string;
    public msgNo: number;
    public segNo: number;
    public refMsgNo?: number;
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
            Format.dig(msgLength + HEADER_LENGTH + dialogId.length + String(msgNo).length),
            Format.num(HBCI_VERSION),
            dialogId,
            Format.num(msgNo),
        ];
    }

    protected deserialize(input: string[][]) {
        const [ [msgLength], [hbciVersion], [dialogId], [msgNo], [refMsgNo] ] = input;
        if (hbciVersion !== "300") {
            throw new Error(`Version mismatch. Server is using HBCI version ${hbciVersion}.`);
        }
        this.msgLength = Parse.dig(msgLength);
        this.dialogId = dialogId;
        this.msgNo = Parse.dig(msgNo);
        this.refMsgNo = Parse.dig(refMsgNo);
    }
}
