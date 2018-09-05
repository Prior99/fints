import { HITANS } from "../hitans";
import { testSegment } from "./utils";
import { ReturnValue } from "../../return-value";

testSegment(HITANS, [
    {
        serialized: "HITANS:53:5:4+" +
            "1+" +
            "1+" +
            "1+" +
            "J:N:0:" +
            "942:2:MTAN2:mobileTAN::mobile TAN:6:1:SMS:2048:1:J:1:0:N:0:2:N:J:00:1:1:" +
            "962:2:HHD1.4:HHD:1.4:Smart-TAN plus manuell:6:1:Challenge:2048:1:J:1:0:N:0:2:N:J:00:1:1:" +
            "972:2:HHD1.4OPT:HHDOPT1:1.4:Smart-TAN plus optisch:6:1:Challenge:2048:1:J:1:0:N:0:2:N:J:00:1:1",
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
                {
                    securityFunction: "942",
                    tanProcess: "2",
                    techId: "MTAN2",
                    zkaId: "mobileTAN",
                    zkaVersion: "",
                    name: "mobile TAN",
                    maxLengthInput: 6,
                    allowedFormat: "1",
                    textReturnvalue: "SMS",
                    maxLengthReturnvalue: 2048,
                    numberOfSupportedLists: 1,
                    multipleTansAllowed: true,
                    tanTimeDialogAssociation: "1",
                    tanListNumberRequired: 0,
                    cancelAllowed: false,
                    smsChargeAccountRequired: 0,
                    principalAccountRequired: 2,
                    challengeClassRequired: false,
                    challengeValueRequired: true,
                    initializationMode: "00",
                    descriptionRequired: 1,
                    supportedMediaNumber: 1,
                },
            ],
        },
    },
], "in");
