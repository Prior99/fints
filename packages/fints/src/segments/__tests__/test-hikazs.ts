import { HIKAZS } from "../hikazs";
import { testSegment } from "./utils";

testSegment(HIKAZS, [
    {
        serialized: "HIKAZS:11:2:4+1+2+60:J'",
        structured: {
            type: "HIKAZS",
            segNo: 11,
            version: 2,
            reference: 4,
            maxRequestCount: 1,
            minSignatures: 2,
        },
    },
], "in");
