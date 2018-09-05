import { Format } from "../format";
import { Segment, SegmentClass } from "./segment";

export class HNVSDProps {
    public segNo: number;
    public segments: Segment<any>[];
}

/**
 * HNVSD (Verschlüsselte Daten)
 * Section B.5.4
 */
export class HNVSD extends SegmentClass(HNVSDProps) {
    public type = "HNVSD";

    protected defaults() {
        this.version = 1;
    }

    protected serialize() {
        return [
            Format.stringWithLength(
                this.segments
                    .map(segment => String(segment))
                    .join(""),
            ),
        ];
    }

    protected deserialize() { throw new Error("Not implemented."); }
}
