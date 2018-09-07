import { HISYN } from "../hisyn";
import { testSegment } from "./utils";

testSegment(HISYN, [
    {
        serialized: "HISYN:60:4:5+DDDA10000000000000000000000A'",
        structured: {
            type: "HISYN",
            segNo: 60,
            version: 4,
            reference: 5,
            systemId: "DDDA10000000000000000000000A",
        },
    },
], "in");
