export abstract class Segment {
    public static countryCode = 280;

    public abstract type: string;
    public abstract version: number;
    public segmentNo: number;
    public data: any[];

    constructor(segmentNo: number, data: any[]) {
        this.segmentNo = segmentNo;
        this.data = data;
    }

    public toString() {
        return this.data.reduce((result, data) => {
            return `${result}+${data}`;
        }, `${this.type}:${this.segmentNo}:${this.version}`) + "'";
    }
}
