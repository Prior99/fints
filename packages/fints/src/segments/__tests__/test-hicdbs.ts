import { HICDBS } from "../hicdbs";
import { testSegment } from "./utils";

testSegment(HICDBS, [
    {
        serialized: "HICDBS:11:1:4+1+2+60:J'",
        structured: {
            type: "HICDBS",
            segNo: 11,
            version: 1,
            reference: 4,
            maxRequestCount: 1,
            minSignatures: 2,
        },
    },
], "in");
