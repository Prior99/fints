import { HKCDB } from "../hkcdb";
import { testSegment } from "./utils";

const iban = "DE27100777770209299700";
const bic = "DEUTDEFF500";

testSegment(HKCDB, [
    {
        serialized: "HKCDB:3:1+DE27100777770209299700:DEUTDEFF500+urn:iso:std:iso:20022:tech:xsd:pain.001.001.03+++8'",
        structured: {
            type: "HKSAL",
            segNo: 3,
            version: 1,
            account: { iban, bic },
            painFormats: ["urn:iso:std:iso:20022:tech:xsd:pain.001.001.03"],
            touchdown: "8",
        },
    },
], "out");
