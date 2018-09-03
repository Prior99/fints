import { Constructable } from "../types";

export interface SegmentProps {
    segNo: number;
}

export abstract class Segment<TProps extends SegmentProps> {
    public abstract type: string;
    public abstract version: number;
    public segNo: number;

    constructor(arg: string | TProps) {
        if (typeof arg === "string") {
            this.deserialize(arg);
        } else {
            Object.assign(this, arg);
        }
    }

    protected abstract serialize(): string[];
    protected abstract deserialize(input: string): void;

    public toString() {
        const body = this.serialize().reduce((result, data) => {
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
