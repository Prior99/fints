import { HKTAB } from "../hktab";
import { testSegment } from "./utils";

testSegment(HKTAB, [
    {
        serialized: "HKTAB:8:5+0+A'",
        structured: {
            type: "HKTAB",
            segNo: 8,
            version: 5,
            mode: 0,
        },
    },
], "out");
