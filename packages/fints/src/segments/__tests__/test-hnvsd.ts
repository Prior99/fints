import { HNVSD } from "../hnvsd";
import { HKTAB } from "../hktab";
import { HKSYN } from "../hksyn";

describe("Segment HNVSD", () => {
    test(`serializes "HNVSD:999:1+@26@HKSYN:5:3+0'HKTAB:8:5+0+A''"`, () => {
        expect(String(new HNVSD({
            type: "HNVSD",
            segNo: 999,
            version: 1,
            segments: [
                new HKSYN({
                    type: "HKSYN",
                    segNo: 5,
                    version: 3,
                    mode: 0,
                }),
                new HKTAB({
                    type: "HKTAB",
                    segNo: 8,
                    version: 5,
                    mode: 0,
                }),
            ],
        }))).toBe("HNVSD:999:1+@26@HKSYN:5:3+0'HKTAB:8:5+0+A''");
    });

    test(`deserializes "HNVSD:999:1+@12@HKSYN:5:3+0''"`, () => {
        expect(new HNVSD("HNVSD:999:1+@12@HKSYN:5:3+0''")).toEqual({
            type: "HNVSD",
            segNo: 999,
            version: 1,
            rawSegments: [
                [
                    [ "HKSYN", "5", "3" ],
                    [ "0" ],
                ],
            ],
        });
    });
});
