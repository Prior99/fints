import { FinTSConnection } from "./connection";
import { HKIDN, HKVVB, HKSYN, HKEND, HISALS, HIKAZS } from "./segments";
import { FinTSRequest } from "./request";
import { TANMethod } from "./tan";

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
    public tanMethods: TANMethod[] = [];

    private hisalsVersion = 6;
    private hikazsVersion = 6;

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
        this.hisalsVersion = response.segmentMaxVersion(HISALS);
        this.hikazsVersion = response.segmentMaxVersion(HIKAZS);
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
            const returnValues = response.errors;
            const errors = response.errors.map(error => `"${error}"`).join(", ");
            throw new Error(`Error(s) in dialog: ${errors}.`);
        }
        this.msgNo++;
        return response;
    }
}
