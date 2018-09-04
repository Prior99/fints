import "isomorphic-fetch";
import { verbose } from "./logger";
import { encodeBase64, decodeBase64 } from "./base64";
import { FinTSRequest } from "./request";
import { FinTSResponse } from "./response";

export class FinTSConnectionConfiguration {
    public url: string;
    public debug = false;
}

export class FinTSConnection extends FinTSConnectionConfiguration {
    constructor(config: FinTSConnectionConfiguration) {
        super();
        Object.assign(this, config);
    }

    public async send(message: FinTSRequest): Promise<FinTSResponse> {
        const { url } = this;
        verbose(`Sending Request: ${message}`);
        if (this.debug) { verbose(`Parsed Request:\n${message.debugString}`); }
        const request = await fetch(url, {
            method: "POST",
            body: encodeBase64(String(message)),
        });
        if (!request.ok) { throw new Error(`Received bad status code ${request.status} from FinTS endpoint.`); }
        const responseString = decodeBase64(await request.text());
        const response = new FinTSResponse(responseString);
        verbose(`Received Response: ${responseString}`);
        if (this.debug) { verbose(`Parsed Response:\n${response.debugString}`); }
        return response;
    }
}
