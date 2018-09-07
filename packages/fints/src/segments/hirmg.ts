import { SegmentClass } from "./segment";
import { ReturnValue } from "../return-value";

export class HIRMGProps {
    public segNo: number;
    public returnValues: Map<string, ReturnValue>;
}

/**
 * HIRMG (Rückmeldungen zur Gesamtnachricht)
 * Section B.7.2
 */
export class HIRMG extends SegmentClass(HIRMGProps) {
    public type = "HIRMG";

    protected defaults() {
        this.version = 2;
    }

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        this.returnValues = new Map();
        input
            .map(dataElements => {
                const [ code, , message, ...parameters ] = dataElements;
                return new ReturnValue({
                    code,
                    message,
                    parameters,
                });
            })
            .forEach(response => this.returnValues.set(response.code, response));
    }
}
