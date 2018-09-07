import { HISALS } from "../hisals";
import { testSegment } from "./utils";

testSegment(HISALS, [
    {
        serialized: "HISALS:13:3:4+1+2'",
        structured: {
            type: "HISALS",
            segNo: 13,
            version: 3,
            reference: 4,
            maxRequestCount: 1,
            minSignatures: 2,
        },
    },
], "in");
