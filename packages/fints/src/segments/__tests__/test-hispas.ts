import { HISPAS } from "../hispas";
import { testSegment } from "./utils";

testSegment(HISPAS, [
    {
        serialized: "HISPAS:143:1:4+1+1+1+J:N:N:" +
            "sepade.pain.001.001.02.xsd:" +
            "sepade.pain.001.002.02.xsd:" +
            "sepade.pain.001.002.03.xsd:" +
            "sepade.pain.008.002.02.xsd:" +
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.003.03:" +
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.008.003.02:" +
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.001.03:" +
            "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.008.001.02'",
        structured: {
            type: "HISPAS",
            segNo: 143,
            reference: 4,
            version: 1,
            painFormats: [
                "sepade.pain.001.001.02.xsd",
                "sepade.pain.001.002.02.xsd",
                "sepade.pain.001.002.03.xsd",
                "sepade.pain.008.002.02.xsd",
                "urn:iso:std:iso:20022:tech:xsd:pain.001.003.03",
                "urn:iso:std:iso:20022:tech:xsd:pain.008.003.02",
                "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03",
                "urn:iso:std:iso:20022:tech:xsd:pain.008.001.02",
            ],
        },
    },
], "in");
