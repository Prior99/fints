import { Response } from "../response";
import { HITAN } from "../segments/hitan";

export class TanRequiredError extends Error {
    transactionReference:string;
    challengeText:string;
    challengeMedia:Buffer;

    constructor(message:string, transactionReference: string, challengeText:string, challengeMedia:Buffer) {
        super(message);
        this.transactionReference = transactionReference;
        this.challengeText = challengeText;
        this.challengeMedia = challengeMedia;
    }
}