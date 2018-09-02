import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./base64";

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

    protected async send(message: FinTSMessage) {
        const { url } = this.config;
        const request = await fetch(url, {
            method: "POST",
            body: encodeBase64(String(message)),
        });
        if (!request.ok) { throw new Error(`Received bad status code ${request.status} from FinTS endpoint.`); }
        const response = decodeBase64(await request.text());
        // console.log(response);
        return response;
    }
}
