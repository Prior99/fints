import { HKSPA } from "../hkspa";
import { testSegment } from "./utils";
import { ReturnValue } from "../../return-value";

testSegment(HKSPA, [
    {
        serialized: "HKSPA:3:1+",
        structured: {
            type: "HKSPA",
            segNo: 3,
            version: 1,
        },
    },
], "out");
