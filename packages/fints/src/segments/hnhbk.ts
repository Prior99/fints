import { Format } from "../format";
import { Parse } from "../parse";
import { SegmentClass } from "./segment";
import { HBCI_VERSION } from "../constants";

export class HNHBKProps {
    public msgLength: number;
    public dialogId: string;
    public msgNo: number;
    public segNo: number;
    public refMsg?: {
        msgNo: number;
        dialogId: string;
    };
}

/**
 * HNHBK (Nachrichtenkopf)
 * Section B.5.2
 */
export class HNHBK extends SegmentClass(HNHBKProps) {
    public type = "HNHBK";

    protected defaults() {
        this.version = 3;
    }

    protected serialize() {
        const { msgLength, dialogId, msgNo, refMsg } = this;
        const result: (string | string[])[] = [
            Format.dig(msgLength),
            Format.num(HBCI_VERSION),
            dialogId,
            Format.num(msgNo),
        ];
        if (refMsg) {
            result.push([ refMsg.dialogId, String(refMsg.msgNo) ]);
        }
        return result;
    }

    protected deserialize(input: string[][]) {
        const [ [msgLength], [hbciVersion], [dialogId], [msgNo], refMsg ] = input;
        if (hbciVersion !== "300") {
            throw new Error(`Version mismatch. Server is using HBCI version ${hbciVersion}.`);
        }
        this.msgLength = Parse.dig(msgLength);
        this.dialogId = dialogId;
        this.msgNo = Parse.dig(msgNo);
        if (typeof refMsg !== "undefined") {
            const [refDialogId, refMsgNo] = refMsg;
            this.refMsg = {
                dialogId: refDialogId,
                msgNo: Parse.num(refMsgNo),
            };
        }
    }
}
