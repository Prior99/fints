import { Parse } from "../parse";
import { Constructable } from "../types";
import { parse } from "../utils";

export interface SegmentProps {
    segNo: number;
}

export abstract class Segment<TProps extends SegmentProps> {
    public abstract type: string;
    public version: number;
    public segNo: number;
    public reference?: number;

    constructor(arg: string | string[][] | TProps) {
        this.defaults();
        if (typeof arg === "object" && !Array.isArray(arg)) {
            Object.assign(this, arg);
        } else {
            const splitted = typeof arg === "string" ? parse(arg)[0] : arg;
            this.segNo = Parse.num(splitted[0][1]);
            this.version = Parse.num(splitted[0][2]);
            this.deserialize(splitted.splice(1));
            if (splitted[0].length > 3) { this.reference = Parse.num(splitted[0][3]); }
        }
    }

    protected abstract serialize(): (string | string[])[];
    protected abstract deserialize(input: string[][]): void;

    protected defaults() { return; }

    public toString() {
        const header = `${this.type}:${this.segNo}:${this.version}`;
        const body = this.serialize()
            .map(data => Array.isArray(data) ? data.join(":") : data)
            .join("+");
        return `${header}+${body}'`;
    }

    public get debugString() {
        const info = `Type: ${this.type}\n` +
            `Version: ${this.version}\n` +
            `Segment Number: ${this.segNo}\n` +
            `Referencing: ${this.reference === undefined ? "None" : this.reference}\n` +
            `----\n`;
        return this.serialize().reduce((result, group, index) => {
            return result + `DG ${index}: ${Array.isArray(group) ? group.join(", ") : group}\n`;
        }, info);
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
