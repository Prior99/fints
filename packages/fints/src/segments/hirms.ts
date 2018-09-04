import { ReturnValue } from "../return-value";
import { Parse } from "../parse";
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
    public version = 3;

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        this.returnValues = new Map();
        input
            .map(dataElements => {
                const [ code, reference, message, ...parameters ] = dataElements;
                return new ReturnValue({
                    code,
                    message,
                    parameters,
                });
            })
            .forEach(response => this.returnValues.set(response.code, response));
    }
}
