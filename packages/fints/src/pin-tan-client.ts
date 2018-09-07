import { Client } from "./client";
import { Dialog } from "./dialog";
import { Request } from "./request";
import { Connection } from "./connection";
import { Segment } from "./segments";

export interface PinTanClientConfig {
    blz: string;
    name: string;
    pin: string;
    url: string;
    debug?: boolean;
}

export class PinTanClient extends Client {
    private connection: Connection;
    protected config: PinTanClientConfig;

    constructor(config: PinTanClientConfig) {
        super();
        this.config = config;
        const { url, debug  } = config;
        this.connection = new Connection({ url, debug });
    }

    public createDialog() {
        const { blz, name, pin } = this.config;
        const { connection } = this;
        return new Dialog({ blz, name, pin, systemId: "0", connection });
    }

    public createRequest(dialog: Dialog, segments: Segment<any>[], tan?: string) {
        const { blz, name, pin } = this.config;
        const { systemId, dialogId, msgNo, tanMethods } = dialog;
        return new Request({ blz, name, pin, systemId, dialogId, msgNo, segments, tanMethods, tan });
    }
}
