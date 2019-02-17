import { SegmentClass } from "./segment";

export class HISPASProps {
    public segNo: number;
    public painFormats: string[] = [];
}

/**
 * HISPAS
 */
export class HISPAS extends SegmentClass(HISPASProps) {
    public type = "HISPAS";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [
            [ ],
            [ ],
            [ ],
            [ ...painFormats ],
        ] = input;

        this.painFormats = painFormats.filter(x => x.indexOf("pain") !== -1);
    }
}
