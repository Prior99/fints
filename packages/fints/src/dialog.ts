import { FinTSConnection } from "./connection";
import { HKIDN, HKVVB, HKSYN, HKEND } from "./segments";
import { FinTSRequest } from "./request";
import { TANMethod } from "./tan";

export class FinTSDialogConfiguration {
    public blz: string;
    public name: string;
    public pin: string;
    public systemId: number;
    public connection: FinTSConnection;
}

export class FinTSDialog extends FinTSDialogConfiguration {
    public msgNo = 1;
    public dialogId = 0;
    public tanMethods: TANMethod[] = [];
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
        const encryptedSegments = [
            new HKIDN({ segNo: 3, blz, name, systemId: 0 }),
            new HKVVB({ segNo: 4 }),
            new HKSYN({ segNo: 5 }),
        ];
        return new FinTSRequest({ blz, name, pin, systemId, dialogId, msgNo, encryptedSegments });
    }

    public get msgInit() {
        const { blz, name, pin, systemId, dialogId, msgNo, tanMethods } = this;
        const encryptedSegments = [
            new HKIDN({ segNo: 3, blz, name, systemId }),
            new HKVVB({ segNo: 4 }),
        ];
        return new FinTSRequest({ blz, name, pin, systemId, dialogId, msgNo, encryptedSegments, tanMethods });
    }

    public get msgEnd() {
        const { blz, name, pin, systemId, dialogId, msgNo, tanMethods } = this;
        const encryptedSegments = [
            new HKEND({ segNo: 3, dialogId }),
        ];
        return new FinTSRequest({ blz, name, pin, systemId, dialogId, msgNo, encryptedSegments });
    }

    public async sync() {
        const response = await this.send(this.msgSync);
        this.systemId = response.systemId;
        this.dialogId = response.dialogId;
        this.bankName = response.bankName;
        this.hksalVersion = response.hksalMaxVersion;
        this.hkkazVersion = response.hkkazMaxVersion;
        this.hktanVersion = response.hktanMaxVersion;
        this.tanMethods = response.supportedTanMethods;
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
