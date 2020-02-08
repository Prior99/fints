import { HKTAN } from "../hktan";
import { testSegment } from "./utils";

testSegment(HKTAN, [
    {
        serialized: "HKTAN:5:3+4++++++++3'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 3,
            process: "4",
            aref: "3",
            medium: "3",
        },
    },
    {
        serialized: "HKTAN:5:4+4+++++++++3'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 4,
            process: "4",
            aref: "3",
            medium: "3",
        },
    },
    {
        serialized: "HKTAN:5:5+4+++++++++++3'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 5,
            process: "4",
            aref: "3",
            medium: "3",
        },
    },
    {
        serialized: "HKTAN:5:6+4++++++++++3'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 6,
            process: "4",
            aref: "3",
            medium: "3",
        },
    },
    {
        serialized: "HKTAN:5:6+4+HKIDN'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 6,
            process: "4",
            aref: "3",
        },
    },
    {
        serialized: "HKTAN:5:6+2++++3+N'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 6,
            process: "2",
            aref: "3",
            medium: "3",
        },
    },
    {
        serialized: "HKTAN:5:5+2++++3++N'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 5,
            process: "2",
            aref: "3",
            medium: "3",
        },
    },
    {
        serialized: "HKTAN:5:3+2++3++N'",
        structured: {
            type: "HKTAN",
            segNo: 5,
            version: 3,
            process: "2",
            aref: "3",
            medium: "3",
        },
    },
], "out");
