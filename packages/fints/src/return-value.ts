export class ReturnValue {
    public code: number;
    public message: string;
    public parameters: string[];

    constructor(props: Partial<ReturnValue>) {
        Object.assign(this, props);
    }

    public get success() { return String(this.code).startsWith("0"); }
    public get warning() { return String(this.code).startsWith("3"); }
    public get error() { return String(this.code).startsWith("9"); }
}
