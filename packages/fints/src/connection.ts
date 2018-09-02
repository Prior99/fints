import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./base64";
import { FinTSMessage } from "./message";
import { FinTSResponse } from "./response";

export class FinTSConnectionConfiguration {
    public url: string;
}

export abstract class FinTSConnection extends FinTSConnectionConfiguration {
    constructor(config: FinTSConnectionConfiguration) {
        super();
        Object.assign(this, config);
    }

    protected async send(message: FinTSMessage): Promise<FinTSResponse> {
        const { url } = this;
        const request = await fetch(url, {
            method: "POST",
            body: encodeBase64(String(message)),
        });
        if (!request.ok) { throw new Error(`Received bad status code ${request.status} from FinTS endpoint.`); }
        const response = decodeBase64(await request.text());
        return new FinTSResponse(response);
    }
}
