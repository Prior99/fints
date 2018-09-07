/**
 * Wraps a return value used in the HIRMG and HIRMS segments.
 */
export class ReturnValue {
    /**
     * The return value's code.
     * Identifies the purpose of the return value and also specifies whether it's a notification of succes,
     * a warning or an error.
     */
    public code: string;
    /**
     * A human readable message.
     */
    public message: string;
    /**
     * Arbitrary parameters.
     */
    public parameters: string[];
    /**
     * A return value might reference a set of certain segments of a referenced request, for example if it
     * was a warning or an error in a HIRMS segment.
     */
    public references: number[];

    constructor(props: Partial<ReturnValue>) {
        Object.assign(this, props);
    }

    /**
     * Will be `true` if the return value was a successful one (code starts with "0").
     */
    public get success() { return String(this.code).startsWith("0"); }
    /**
     * Will be `true` if the return value was warning (code starts with "3").
     */
    public get warning() { return String(this.code).startsWith("3"); }
    /**
     * Will be `true` if the return value was an error (code starts with "9").
     */
    public get error() { return String(this.code).startsWith("9"); }
}
