import { Connection } from "./types";
import { HKIDN, HKVVB, HKSYN, HKTAN, HKEND, HISALS, HIKAZS, HICDBS, HIUPD } from "./segments";
import { Request } from "./request";
import { TanMethod } from "./tan-method";
import { escapeFinTS } from "./utils";

/**
 * Properties passed to configure a `Dialog`.
 */
export class DialogConfig {
    /**
     * The product ID that was assigned by ZKA
     */
    public productId = "fints";
    /**
     * The banks identification number (Bankleitzahl).
     */
    public blz: string;
    /**
     * The username or identification number.
     */
    public name: string;
    /**
     * The pin code or password used for authenticating with the fints server.
     */
    public pin: string;
    /**
     * The system's id. This id needs to be stored across all dialogs and will be assigned
     * by the server at the first request.
     */
    public systemId: string;
    /**
     * An instance implementing `Connection` used for performing requests.
     */
    public connection: Connection;
}

/**
 * A dialog consisting of multiple related requests and responses.
 */
export class Dialog extends DialogConfig {
    /**
     * All messages sent within a dialog are numbered.
     * This counter is kept here.
     */
    public msgNo = 1;
    /**
     * A unique id for the dialog.
     * Assigned by the server as response to the initial request.
     * For the initial request a `0` needs to be sent.
     */
    public dialogId = "0";
    /**
     * A list of allowed TAN methods as configured by the server.
     */
    public tanMethods: TanMethod[] = [];
    /**
     * The server will only accept a certain version for the HISALS segment.
     * This version defaults to the latest version (6).
     * The server's maximum supported version can be parsed from the initial requests and is stored here.
     */
    public hisalsVersion = 6;
    /**
     * The server will only accept a certain version for the HIKAZS segment.
     * This version defaults to the latest version (6).
     * The server's maximum supported version can be parsed from the initial requests and is stored here.
     */
    public hikazsVersion = 6;
    /**
     * The server will only accept a certain version for the HICDB segment.
     * This version defaults to the latest version (1).
     * The server's maximum supported version can be parsed from the initial requests and is stored here.
     */
    public hicdbVersion = 1;
    /**
     * A list of supported SEPA pain-formats as configured by the server.
     */
    public painFormats: string[] = [];

    public hiupd: HIUPD[];

    constructor(config: DialogConfig) {
        super();
        Object.assign(this, config);
    }

    /**
     * Send a synchronization request to the server.
     * Only one synchronization is needed per dialog.
     * This is most likely the initial request sent.
     * It will be answered with the system's id and a list of supported TAN methods.
     * The supported HISALS and HIKAZS version can also be parsed from this request.
     *
     * @return The response as received by the server.
     */
    public async sync() {
        const { blz, name, pin, systemId, dialogId, msgNo } = this;
        const segments = [
            new HKIDN({ segNo: 3, blz, name, systemId: "0" }),
            new HKVVB({ segNo: 4, productId: this.productId, lang: 0 }),
            new HKSYN({ segNo: 5 }),
        ];
        const response = await this.send(new Request({ blz, name, pin, systemId, dialogId, msgNo, segments }));
        this.systemId = escapeFinTS(response.systemId);
        this.dialogId = response.dialogId;
        this.hisalsVersion = response.segmentMaxVersion(HISALS);
        this.hikazsVersion = response.segmentMaxVersion(HIKAZS);
        this.hicdbVersion = response.segmentMaxVersion(HICDBS);
        this.tanMethods = response.supportedTanMethods;
        this.painFormats = response.painFormats;
        const hiupd = response.findSegments(HIUPD);
        this.hiupd = hiupd;
        await this.end();
    }

    /**
     * Send the initializing request to the server.
     * The dialog is ready for performing custom requests afterwards.
     */
    public async init() {
        const { blz, name, pin, dialogId, msgNo, tanMethods } = this;
        const segments = [
            new HKIDN({ segNo: 3, blz, name, systemId: "0" }),
            new HKVVB({ segNo: 4, productId: this.productId, lang: 0 }),
            new HKTAN({ segNo: 5, version: 6, process: "4" }),
        ];
        const response = await this.send(
            new Request({ blz, name, pin, systemId: "0", dialogId, msgNo, segments, tanMethods }),
        );
        this.dialogId = response.dialogId;
    }

    /**
     * End the currently open request.
     */
    public async end() {
        const { blz, name, pin, systemId, dialogId, msgNo } = this;
        const segments = [
            new HKEND({ segNo: 3, dialogId }),
        ];
        await this.send(new Request({ blz, name, pin, systemId, dialogId, msgNo, segments }));
        this.dialogId = "0";
        this.msgNo = 1;
    }

    /**
     * Send a custom request to the fints server and return the received response.
     *
     * @param request The request to send to the server.
     *
     * @return The response received from the server.
     */
    public async send(request: Request) {
        request.msgNo = this.msgNo;
        request.dialogId = this.dialogId;
        request.tanMethods = this.tanMethods;

        const response = await this.connection.send(request);
        if (!response.success) {
            const errors = response.errors.map(error => `"${error}"`).join(", ");
            throw new Error(`Error(s) in dialog: ${errors}.`);
        }
        this.msgNo++;
        return response;
    }
}
