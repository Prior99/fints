export class FinTSDialogConfiguration {
    public blz: string;
    public name: string;
    public pin: string;
    public systemId: number;
}

import { FinTSConnection } from "./connection";
export class FinTSDialog extends FinTSDialogConfiguration {
    private connection: FinTSConnection;

    constructor(config: FinTSDialogConfiguration, connection: FinTSConnection) {
        super();
        this.connection = connection;
        Object.assign(this, config);
    }
}
