import { HITAN } from "../hitan";
import { testSegment } from "./utils";

testSegment(HITAN, [
    {
        serialized: "HITAN:5:6:4+4++9BPTSkw1q28BAAD4GXdqn7BCCgQA+Ihre TAN wurde als SMS an die Nummer 123456789 gesendet.'",
        structured: {
            type: "HITAN",
            segNo: 5,
            version: 6,
            process: 4,
            reference: 4,
            transactionHash: "",
            transactionReference: "9BPTSkw1q28BAAD4GXdqn7BCCgQA",
            challengeText: "Ihre TAN wurde als SMS an die Nummer 123456789 gesendet.",
        },
    },
], "in");
