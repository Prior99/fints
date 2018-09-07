import { HNSHA } from "../hnsha";
import { testSegment } from "./utils";

testSegment(HNSHA, [
    {
        serialized: "HNSHA:173:2+12345678++12345'",
        structured: {
            type: "HNSHA",
            segNo: 173,
            version: 2,
            msgNo: 1,
            secRef: 12345678,
            pin: "12345",
        },
    },
    {
        serialized: "HNSHA:173:2+12345678++12345:123456'",
        structured: {
            type: "HNSHA",
            segNo: 173,
            version: 2,
            msgNo: 1,
            secRef: 12345678,
            pin: "12345",
            tan: "123456",
        },
    },
], "out");
