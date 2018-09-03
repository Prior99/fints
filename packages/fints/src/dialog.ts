import { FinTSConnection } from "./connection";
import { HKIDN, HKVVB, HKSYN, HKEND } from "./segments";
import { FinTSRequest } from "./request";

export class FinTSDialogConfiguration {
    public blz: string;
    public name: string;
    public pin: string;
    public systemId: string;
    public connection: FinTSConnection;
}

export class FinTSDialog extends FinTSDialogConfiguration {
    public msgNo = 1;
    public dialogId = 0;
    public bankName: string;

    private hksalVersion = 6;
    private hkkazVersion = 6;
    private hktanVersion: number;

    constructor(config: FinTSDialogConfiguration) {
        super();
        Object.assign(this, config);
    }

    private get msgSync() {
        const { blz, name, pin, systemId, dialogId, msgNo } = this;
        const segments = [
            new HKIDN({ segNo: 3, blz, name, systemId: "0" }),
            new HKVVB({ segNo: 4 }),
            new HKSYN({ segNo: 5 }),
        ];
        return new FinTSRequest({ blz, name, pin, systemId, dialogId, msgNo, segments });
    }

    public get msgInit() {
        const { blz, name, pin, systemId, dialogId, msgNo } = this;
        const segments = [
            new HKIDN({ segNo: 3, blz, name, systemId }),
            new HKVVB({ segNo: 4 }),
        ];
        return new FinTSRequest({ blz, name, pin, systemId, dialogId, msgNo, segments });
    }

    public get msgEnd() {
        const { blz, name, pin, systemId, dialogId, msgNo } = this;
        const segments = [
            new HKEND({ segNo: 3, dialogId }),
        ];
        return new FinTSRequest({ blz, name, pin, systemId, dialogId, msgNo, segments });
    }

    public async sync() {
        const response = await this.send(this.msgSync);
        this.systemId = response.systemId;
        this.dialogId = response.dialogId;
        this.bankName = response.bankName;
        this.hksalVersion = response.hksalMaxVersion;
        this.hkkazVersion = response.hkkazMaxVersion;
        await this.end();
    }

    public async init() {
        const response = await this.send(this.msgInit);
        this.dialogId = response.dialogId;
    }

    public async end() {
        const response = await this.send(this.msgEnd);
        this.dialogId = 0;
        this.msgNo = 1;
    }

    public async send(message: FinTSRequest) {
        message.msgNo = this.msgNo;
        message.dialogId = this.dialogId;

        const response = await this.connection.send(message);
        if (!response.success) {
            throw new Error(`Error in dialog: "${response.summaryBySegment}"`);
        }
        this.msgNo++;
        return response;
    }
}
