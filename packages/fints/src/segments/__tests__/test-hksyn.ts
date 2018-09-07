import { HKSYN } from "../hksyn";
import { testSegment } from "./utils";

testSegment(HKSYN, [
    {
        serialized: "HKSYN:5:3+0'",
        structured: {
            type: "HKSYN",
            segNo: 5,
            version: 3,
            mode: 0,
        },
    },
], "out");
