import { HKKAZ } from "../hkkaz";
import { testSegment } from "./utils";

const account = {
    accountNumber: "01234",
    blz: "12345678",
    iban: "DE27100777770209299700",
    bic: "DEUTDEFF500",
};

testSegment(HKKAZ, [
    {
        serialized: "HKKAZ:3:5+01234::280:12345678+N+20181010+20181101++8'",
        structured: {
            type: "HKKAZ",
            segNo: 3,
            version: 5,
            account,
            startDate: new Date("2018-10-10T12:00:00Z"),
            endDate: new Date("2018-11-01:00:00Z"),
            touchdown: "8",
        },
    },
    {
        serialized: "HKKAZ:3:7+DE27100777770209299700:DEUTDEFF500:01234::280:12345678+N+20181010+20181101++8'",
        structured: {
            type: "HKKAZ",
            segNo: 3,
            version: 7,
            account,
            startDate: new Date("2018-10-10T12:00:00Z"),
            endDate: new Date("2018-11-01:00:00Z"),
            touchdown: "8",
        },
    },
], "out");
