import { Parse } from "../parse";
import { Constructable } from "../types";
import { parse } from "../utils";

/**
 * Properties passed to a segment.
 * These properties will be used to serialize a segment and are generated when
 * deserializing it.
 */
export interface SegmentProps {
    segNo: number;
}

/**
 * A segment of a message.
 * Each message sent to the server or received from it will consist of multiple segments.
 * Each segment itself is versionized and has a segment type.
 * Segments within a message are numbered.
 */
export abstract class Segment<TProps extends SegmentProps> {
    /**
     * This segment's type.
     */
    public abstract type: string;
    /**
     * The version of this segment.
     */
    public version: number;
    /**
     * The segments are numbered within a message.
     * This represents the segment's message.
     */
    public segNo: number;
    /**
     * Segments can reference other segments.
     * This is the referenced segment's number.
     */
    public reference?: number;

    constructor(arg: string | string[][] | TProps) {
        this.defaults();
        if (typeof arg === "object" && !Array.isArray(arg)) {
            Object.assign(this, arg);
        } else {
            const splitted = typeof arg === "string" ? parse(arg)[0] : arg;
            this.segNo = Parse.num(splitted[0][1]);
            this.version = Parse.num(splitted[0][2]);
            if (splitted[0].length > 3) { this.reference = Parse.num(splitted[0][3]); }
            this.deserialize(splitted.slice(1));
        }
    }

    /**
     * Serialize this segment into an array of data groups (which is an array of data elements).
     */
    protected abstract serialize(): (string | string[])[];

    /**
     * Deerialize a segment from an array of data groups (which is an array of data elements).
     */
    protected abstract deserialize(input: string[][]): void;

    /**
     * Segments can override this function to provide defaults for their properties.
     */
    protected defaults() { return; }

    /**
     * Serialize the segment into a string that can be used for serializing a request.
     */
    public toString() {
        const header = `${this.type}:${this.segNo}:${this.version}`;
        const body = this.serialize()
            .map(data => Array.isArray(data) ? data.join(":") : data)
            .join("+");
        return `${header}+${body}'`;
    }

    /**
     * Generate a textual representation for debug purposes.
     */
    public get debugString() {
        const info = `Type: ${this.type}\n` +
            `Version: ${this.version}\n` +
            `Segment Number: ${this.segNo}\n` +
            `Referencing: ${this.reference === undefined ? "None" : this.reference}\n` +
            `----\n`;
        return this.serialize().reduce((result, group, index) => {
            return `${result}DG ${index}: ${Array.isArray(group) ? group.join(", ") : group}\n`;
        }, info);
    }
}

/**
 * Create a base class for segments, inheriting from `Segment` and the segment's props.
 */
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
