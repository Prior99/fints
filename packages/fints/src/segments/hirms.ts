import { Parse } from "../parse";
import { SegmentClass } from "./segment";

export interface Response {
    code: number;
    message: string;
    parameters: string[];
}

export class HIRMSProps {
    public segNo: number;
    public responses: Map<number, Response>;
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
        this.responses = new Map();
        input
            .map(dataElements => {
                const [ code, reference, message, ...parameters ] = dataElements;
                return {
                    code: Parse.num(code),
                    message,
                    parameters,
                };
            })
            .forEach(response => this.responses.set(response.code, response));
    }
}
