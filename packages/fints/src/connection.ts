import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./base64";
import { FinTSRequest } from "./request";
import { FinTSResponse } from "./response";

export class FinTSConnectionConfiguration {
    public url: string;
}

export class FinTSConnection extends FinTSConnectionConfiguration {
    constructor(config: FinTSConnectionConfiguration) {
        super();
        Object.assign(this, config);
    }

    public async send(message: FinTSRequest): Promise<FinTSResponse> {
        const { url } = this;
        console.log("REQ", String(message));
        const request = await fetch(url, {
            method: "POST",
            body: encodeBase64(String(message)),
        });
        if (!request.ok) { throw new Error(`Received bad status code ${request.status} from FinTS endpoint.`); }
        const response = decodeBase64(await request.text());
        console.log("RES", response);
        return new FinTSResponse(response);
    }
}
