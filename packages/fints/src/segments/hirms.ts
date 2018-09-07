import { ReturnValue } from "../return-value";
import { SegmentClass } from "./segment";

export class HIRMSProps {
    public segNo: number;
    public returnValues: Map<string, ReturnValue>;
}

/**
 * HIRMS (Rückmeldungen zu Segmenten)
 * Section B.7.3
 */
export class HIRMS extends SegmentClass(HIRMSProps) {
    public type = "HIRMS";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        this.returnValues = new Map();
        input
            .map(dataElements => {
                const [ code, references, message, ...parameters ] = dataElements;
                return new ReturnValue({
                    code,
                    message,
                    references: references.length > 0 ?
                        references.split(",").map(reference => Number(reference.trim())) : [],
                    parameters,
                });
            })
            .forEach(response => this.returnValues.set(response.code, response));
    }
}
