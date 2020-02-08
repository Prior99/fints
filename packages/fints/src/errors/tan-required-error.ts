import { Response } from "../response";
import { HITAN } from "../segments/hitan";
import { DialogConfig, Dialog } from "../dialog";

export class TanRequiredError extends Error {
    transactionReference:string;
    challengeText:string;
    challengeMedia:Buffer;
    dialog:Dialog;

    constructor(message:string, transactionReference: string, challengeText:string, challengeMedia:Buffer, dialog:Dialog) {
        super(message);
        this.transactionReference = transactionReference;
        this.challengeText = challengeText;
        this.challengeMedia = challengeMedia;
        this.dialog = dialog;
    }
}