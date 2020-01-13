import { Response } from "../response";
import { HITAN } from "../segments/hitan";

export class TanRequiredError extends Error {
    transactionReference:string;
    challengeMedia:Buffer;

    constructor(message:string, transactionReference: string, challengeMedia:Buffer) {
        super(message);
        this.transactionReference = transactionReference;
        this.challengeMedia = challengeMedia;
    }
}