import { Constructable } from "../types";
import { splitSegment } from "../utils";

export interface SegmentProps {
    segNo: number;
}

export abstract class Segment<TProps extends SegmentProps> {
    public abstract type: string;
    public abstract version: number;
    public segNo: number;

    constructor(arg: string | TProps) {
        if (typeof arg === "string") {
            this.deserialize(splitSegment(arg));
        } else {
            Object.assign(this, arg);
        }
    }

    protected abstract serialize(): (string | string[])[];
    protected abstract deserialize(input: string[][]): void;

    public toString() {
        const body = this.serialize().reduce((result, data) => {
            if (Array.isArray(data)) {
                return `${result}+${data.join(":")}`;
            }
            return `${result}+${data}`;
        }, `${this.type}:${this.segNo}:${this.version}`);
        return `${body}'`;
    }
}

export function SegmentClass<TProps extends SegmentProps>(
    propsClass: Constructable<TProps>,
): Constructable<TProps & Segment<TProps>> {
    abstract class TempSegment extends Segment<TProps> {}
    const mutableClass: any = TempSegment;

    Object.getOwnPropertyNames(propsClass.prototype)
        .filter(name => name !== "constructor")
        .forEach(name => {
            mutableClass.prototype[name] = propsClass.prototype[name];
        });

    return mutableClass;
}
