import { TanMethod } from "../../tan-method";
import { HITANS } from "../hitans";
import { testSegment } from "./utils";

testSegment(
    HITANS,
    [
        {
            serialized:
                "HITANS:53:5:4+" +
                "1+" +
                "1+" +
                "1+" +
                "J:N:0:" +
                "942:2:MTAN2:mobileTAN::mobile TAN:6:1:SMS:2048:1:J:1:0:N:0:2:N:J:00:1:1:" +
                "962:2:HHD1.4:HHD:1.4:Smart-TAN plus manuell:6:1:Challenge:2048:1:J:1:0:N:0:2:N:J:00:1:1:" +
                "972:2:HHD1.4OPT:HHDOPT1:1.4:Smart-TAN plus optisch:6:1:Challenge:2048:1:J:1:0:N:0:2:N:J:00:1:1'",
            structured: {
                type: "HITANS",
                segNo: 53,
                version: 5,
                reference: 4,
                maxRequests: 1,
                minSignatures: 1,
                securityClass: 1,
                oneStepAllowed: true,
                multiple: false,
                securityProfile: 0,
                tanMethods: [
                    new TanMethod(5, [
                        "942",
                        "2",
                        "MTAN2",
                        "mobileTAN",
                        "",
                        "mobile TAN",
                        "6",
                        "1",
                        "SMS",
                        "2048",
                        "1",
                        "J",
                        "1",
                        "false",
                        "false",
                        "false",
                        "2",
                        "false",
                        "J",
                        "00",
                        "1",
                        "1",
                    ]),
                    new TanMethod(5, [
                        "962",
                        "2",
                        "HHD1.4",
                        "HHD",
                        "1.4",
                        "Smart-TAN plus manuell",
                        "6",
                        "1",
                        "Challenge",
                        "2048",
                        "1",
                        "J",
                        "1",
                        "false",
                        "false",
                        "false",
                        "2",
                        "false",
                        "J",
                        "00",
                        "1",
                        "1",
                    ]),
                    new TanMethod(5, [
                        "972",
                        "2",
                        "HHD1.4OPT",
                        "HHDOPT1",
                        "1.4",
                        "Smart-TAN plus optisch",
                        "6",
                        "1",
                        "Challenge",
                        "2048",
                        "1",
                        "J",
                        "1",
                        "false",
                        "false",
                        "false",
                        "2",
                        "false",
                        "J",
                        "00",
                        "1",
                        "1",
                    ]),
                ],
            },
        },
    ],
    "in",
);
