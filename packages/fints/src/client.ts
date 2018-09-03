import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./base64";
import { FinTSDialog } from "./dialog";
import { Segment, HKSPA } from "./segments";
import { FinTSMessage } from "./message";
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
    protected abstract createMessage(dialog: FinTSDialog, segments: Segment<any>[], tan?: string): FinTSMessage;

    public async getSEPAAccounts(): Promise<SEPAAccount[]> {
        const dialog = this.createDialog();
        await dialog.sync();
        await dialog.init();
        const response = await dialog.send(this.createMessage(dialog, [new HKSPA({ segNo: 3 })]));
        await dialog.end();
        const accounts = response.findSegment("HISPA");
        const accountList = accounts.split("+").slice(1);
        return accountList.map(account => {
            const arr = account.split(":");
            return {
                iban: arr[1],
                bic: arr[2],
                accountNumber: arr[3],
                subAccount: arr[4],
                blz: arr[6],
            };
        });
    }
}
