import { HKVVB } from "../hkvvb";
import { testSegment } from "./utils";

testSegment(HKVVB, [
    {
        serialized: "HKVVB:4:3+0+0+1+fints+0.1'",
        structured: {
            type: "HKVVB",
            segNo: 4,
            version: 3,
            lang: 1,
        },
    },
], "out");
