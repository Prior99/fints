import { HKIDN } from "../hkidn";
import { testSegment } from "./utils";

testSegment(HKIDN, [
    {
        serialized: "HKIDN:3:2+280:12345678+testuser+some-system-id+1'",
        structured: {
            type: "HKIDN",
            segNo: 3,
            version: 2,
            name: "testuser",
            blz: "12345678",
            systemId: "some-system-id",
            customerId: 1,
        },
    },
], "out");
