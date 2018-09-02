import { format } from "date-fns";
import { Segment } from "./segment";
import { leftPad } from "../left-pad";

export interface HNVSDConfiguration {
    segNo: number;
    encodedData: string;
}

export class HNVSD extends Segment {
    public type = "HNVSD";
    public version = 1;
    public encodedData: string;

    constructor({ segNo, encodedData }: HNVSDConfiguration) {
        super(segNo, HNVSD.formatData(encodedData));
        this.encodedData = encodedData;
    }

    public setData(encodedData: string) {
        this.data = HNVSD.formatData(encodedData);
    }

    public addData(encodedData: Segment) {
        console.log("ADD", encodedData)
        this.setData(`${this.encodedData}${encodedData}`);
    }

    private static formatData(encodedData: string) {
        return [ `@${encodedData.length}@${encodedData}` ];
    }
}
