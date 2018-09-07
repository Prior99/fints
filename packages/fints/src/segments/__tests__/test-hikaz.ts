import { HIKAZ } from "../hikaz";
import { testSegment } from "./utils";

testSegment(HIKAZ, [
    {
        serialized: "HIKAZ:5:5:3+@10@abcdefghij'",
        structured: {
            type: "HIKAZ",
            segNo: 5,
            version: 5,
            reference: 3,
            bookedTransactions: "abcdefghij",
        },
    },
    {
        serialized: "HIKAZ:5:5:3++@10@abcdefghij'",
        structured: {
            type: "HIKAZ",
            segNo: 5,
            version: 5,
            reference: 3,
            pendingTransactions: "abcdefghij",
        },
    },
], "in");
