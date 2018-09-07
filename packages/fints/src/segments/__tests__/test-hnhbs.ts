import { HNHBS } from "../hnhbs";
import { testSegment } from "./utils";

testSegment(HNHBS, [
    {
        serialized: "HNHBS:7:1+1'",
        structured: {
            type: "HNHBS",
            segNo: 7,
            version: 1,
            msgNo: 1,
        },
    },
], "out");
