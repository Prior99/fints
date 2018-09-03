import { FinTSClient, FinTSClientConfiguration } from "./client";
import { FinTSDialog } from "./dialog";
import { FinTSMessage } from "./message";
import { FinTSConnection } from "./connection";
import { Segment } from "./segments";

export class FinTSPinTanClient extends FinTSClient {
    private connection: FinTSConnection;

    constructor(config: FinTSClientConfiguration) {
        super(config);
        const { url  } = config;
        this.connection = new FinTSConnection({ url });
    }

    public createDialog() {
        const { blz, name, pin } = this.config;
        const { connection } = this;
        return new FinTSDialog({ blz, name, pin, systemId: 0, connection });
    }

    public createMessage(dialog: FinTSDialog, encryptedSegments: Segment<any>[], tan?: string) {
        const { blz, name, pin } = this.config;
        const { systemId, dialogId, msgNo, tanMethods } = dialog;
        return new FinTSMessage({ blz, name, pin, systemId, dialogId, msgNo, encryptedSegments, tanMethods, tan });
    }
}
