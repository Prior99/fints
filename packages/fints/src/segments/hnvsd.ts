import { format } from "date-fns";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HNVSDConfiguration {
    segNo: number;
    segments: Segment[];
}

export class HNVSD extends Segment {
    public type = "HNVSD";
    public version = 1;

    constructor({ segNo, segments }: HNVSDConfiguration) {
        super(segNo, [HNVSD.formatSegments(segments)]);
    }

    private static formatSegments(segments: Segment[]) {
        const str = segments
            .map(segment => String(segment))
            .join("");
        return `@${str.length}@${str}`;
    }
}
