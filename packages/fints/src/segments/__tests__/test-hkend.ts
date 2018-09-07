import { HKEND } from "../hkend";
import { testSegment } from "./utils";

testSegment(HKEND, [
    {
        serialized: "HKEND:3:1+some-dialog-id'",
        structured: {
            type: "HKEND",
            segNo: 3,
            version: 1,
            dialogId: "some-dialog-id",
        },
    },
], "out");
