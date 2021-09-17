import { Parse } from "../parse";
import { SegmentClass } from "./segment";

export class HITANProps {
    public segNo: number;
    public process: number;
    public transactionHash: string;
    public transactionReference: string;
    public challengeText: string;
    public challengeMediaType: string;
    public challengeMedia: Buffer;
}

export class HITAN extends SegmentClass(HITANProps) {
    public type = "HITAN";

    protected serialize(): string[][] {
        throw new Error("Not implemented.");
    }

    protected deserialize(input: string[][]) {
        if (![6].includes(this.version)) {
            throw new Error(`Unimplemented TAN method version ${this.version} encountered.`);
        }
        const [[process], [transactionHash], [transactionReference], [challengeText], ...challengeHhdUc] = input;

        this.process = Parse.num(process as string);
        this.transactionHash = transactionHash;
        this.transactionReference = transactionReference;
        this.challengeText = challengeText;
        if (challengeHhdUc.length > 0) {
            [this.challengeMediaType, this.challengeMedia] = Parse.challengeHhdUc(challengeHhdUc);
        }
    }
}
