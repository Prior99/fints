import { Format } from "../format";
import { parse } from "../utils";
import { Segment, SegmentClass } from "./segment";

export class HNVSDProps {
    public segNo: number;
    /**
     * Only populated by constructor.
     * Deserializing ignores this property.
     */
    public segments: Segment<any>[];

    /**
     * Populated when deserializing.
     */
    public rawSegments: string[][][];
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

    protected deserialize(input: string[][]) {
        const [ [ content ] ] = input;
        this.rawSegments = parse(content);
    }
}
