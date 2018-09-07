import { HIRMS } from "../hirms";
import { testSegment } from "./utils";

testSegment(HIRMS, [
    {
        serialized: "HIRMS:3:2:4+0010::Auftrag entgegengenommen'",
        structured: {
            type: "HIRMS",
            segNo: 3,
            version: 2,
            reference: 4,
            returnValues: new Map<string, any>([
                [
                    "0010", {
                        code: "0010",
                        message: "Auftrag entgegengenommen",
                        parameters: [],
                        references: [],
                    },
                ],
            ]),
        },
    },
], "in");
