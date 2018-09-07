import { HNHBK } from "../hnhbk";
import { testSegment } from "./utils";

testSegment(HNHBK, [
    {
        serialized: "HNHBK:1:3+000000024665+300+some-dialog-id+1+some-dialog-id:1'",
        structured: {
            type: "HNHBK",
            segNo: 1,
            version: 3,
            msgLength: 24665,
            dialogId: "some-dialog-id",
            msgNo: 1,
            refMsg: {
                msgNo: 1,
                dialogId: "some-dialog-id",
            },
        },
    },
], "bi");
