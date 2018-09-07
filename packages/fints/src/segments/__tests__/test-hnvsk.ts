import { HNVSK } from "../hnvsk";
import { testSegment } from "./utils";
import { Format } from "../../format";

jest.spyOn(Format, "date").mockReturnValueOnce("20180907");
jest.spyOn(Format, "time").mockReturnValueOnce("080000");

testSegment(HNVSK, [
    {
        serialized: "HNVSK:998:3+PIN:1+998+1+1::some-system-id+1:20180907:080000+2:2:13:@8@00000000:5:1+280:12345678:testuser:S:0:0+0'", // tslint:disable-line
        structured: {
            type: "HNVSK",
            segNo: 998,
            version: 3,
            profileVersion: 1,
            systemId: "some-system-id",
            blz: "12345678",
            name: "testuser",

        },
    },
], "bi");
