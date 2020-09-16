import { Dialog } from "../dialog";

export class TanRequiredError extends Error {
    public transactionReference: string;
    public challengeText: string;
    public challengeMedia: Buffer;
    public dialog: Dialog;

    constructor(
        message: string,
        transactionReference: string,
        challengeText: string,
        challengeMedia: Buffer,
        dialog: Dialog,
    ) {
        super(message);
        this.transactionReference = transactionReference;
        this.challengeText = challengeText;
        this.challengeMedia = challengeMedia;
        this.dialog = dialog;
    }
}
