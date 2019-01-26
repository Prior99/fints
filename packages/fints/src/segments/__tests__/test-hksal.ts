import { HKSAL } from "../hksal";
import { testSegment } from "./utils";

const accountNumber = "01234";
const blz = "12345678";
const iban = "DE27100777770209299700";
const bic = "DEUTDEFF500";

testSegment(HKSAL, [
    {
        serialized: "HKSAL:3:5+01234::280:12345678+N++8'",
        structured: {
            type: "HKSAL",
            segNo: 3,
            version: 5,
            account: { accountNumber, blz },
            touchdown: "8",
        },
    },
    {
        serialized: "HKSAL:3:7+DE27100777770209299700:DEUTDEFF500:01234::280:12345678+N++8'",
        structured: {
            type: "HKSAL",
            segNo: 3,
            version: 7,
            account: { accountNumber, blz, iban, bic },
            touchdown: "8",
        },
    },
], "out");
