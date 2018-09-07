import { Format } from "../format";
import { Parse } from "../parse";
import { SegmentClass } from "./segment";
import { SECURITY_SUPPLIER_ROLE, COUNTRY_CODE, COMPRESSION_NONE } from "../constants";

export class HNVSKProps {
    public segNo: number;
    public blz: string;
    public name: string;
    public systemId: string;
    public profileVersion: number;
}

export class HNVSK extends SegmentClass(HNVSKProps) {
    public type = "HNVSK";

    protected defaults() {
        this.version = 3;
    }

    protected serialize() {
        const { blz, name, systemId, profileVersion } = this;
        return [
            ["PIN", Format.num(profileVersion)],
            Format.num(998),
            Format.num(SECURITY_SUPPLIER_ROLE),
            [Format.num(1), Format.empty(), systemId],
            [Format.num(1), Format.date(), Format.time()],
            [
                Format.num(2),
                Format.num(2),
                Format.num(13),
                Format.stringWithLength("00000000"),
                Format.num(5),
                Format.num(1),
            ],
            [Format.num(COUNTRY_CODE), blz, name, "S", Format.num(0), Format.num(0)],
            Format.num(COMPRESSION_NONE),
        ];
    }

    protected deserialize(input: string[][]) {
        const [ [profile, profileVersion] ] = input;
        if (profile !== "PIN") {
            throw new Error(`Unsupported profile: ${profile}`);
        }
        this.profileVersion = Parse.num(profileVersion);
        this.systemId = input[3][2];
        this.name = input[6][2];
        this.blz = input[6][1];
    }
}
