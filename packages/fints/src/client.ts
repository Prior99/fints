import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./base64";
import { FinTSDialog } from "./dialog";
import { Segment, HKSPA, HISPA } from "./segments";
import { FinTSRequest } from "./request";
import { SEPAAccount } from "./sepa-account";

export interface FinTSClientConfiguration {
    blz: string;
    name: string;
    pin: string;
    url: string;
}

export abstract class FinTSClient {
    protected config: FinTSClientConfiguration;

    constructor(config: FinTSClientConfiguration) {
        this.config = config;
    }

    protected abstract createDialog(): FinTSDialog;
    protected abstract createMessage(dialog: FinTSDialog, segments: Segment<any>[], tan?: string): FinTSRequest;

    public async getSEPAAccounts(): Promise<SEPAAccount[]> {
        const dialog = this.createDialog();
        await dialog.sync();
        await dialog.init();
        const response = await dialog.send(this.createMessage(dialog, [new HKSPA({ segNo: 3 })]));
        await dialog.end();
        const hispa = response.findSegment(HISPA);
        return hispa.accounts;
    }
}
