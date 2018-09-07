import { HNSHK } from "../hnshk";
import { testSegment } from "./utils";
import { Format } from "../../format";

jest.spyOn(Format, "date").mockReturnValueOnce("20180907");
jest.spyOn(Format, "time").mockReturnValueOnce("080000");

testSegment(HNSHK, [
    {
        serialized: "HNSHK:2:4+PIN:1+999+123123+1+1+1::some-system-id+1+1:20180907:080000+1:999:1+6:10:16+280:12345678:testuser:S:0:0'", // tslint:disable-line
        structured: {
            type: "HNSHK",
            segNo: 2,
            version: 4,
            profileVersion: 1,
            securityFunction: "999",
            secRef: 123123,
            systemId: "some-system-id",
            blz: "12345678",
            name: "testuser",

        },
    },
], "out");
