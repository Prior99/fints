import { SegmentClass } from "./segment";

export class HISYNProps {
    public segNo: number;
    public systemId: string;
}

/**
 * HISYN (Synchronisierungsantwort)
 * Section C.8.2.2
 */
export class HISYN extends SegmentClass(HISYNProps) {
    public type = "HISYN";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [ [ systemId ] ] = input;
        this.systemId = systemId as string;
    }
}
