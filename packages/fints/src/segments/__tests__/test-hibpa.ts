import { HIBPA } from "../hibpa";
import { testSegment } from "./utils";

testSegment(HIBPA, [
    {
        serialized: "HIBPA:4:3:4+3+280:10020030+Musterbank in Musterstadt+1+1:2:3+201:210:220:300+100'",
        structured: {
            type: "HIBPA",
            segNo: 4,
            version: 3,
            reference: 4,
            bpdVersion: 3,
            countryCode: 280,
            blz: "10020030",
            bankName: "Musterbank in Musterstadt",
            transactionTypeCount: 1,
            supportedLanguages: [1, 2, 3],
            supportedHbciVersions: [201, 210, 220, 300],
        },
    },
], "in");
