import "isomorphic-fetch";
import { verbose } from "./logger";
import { encodeBase64, decodeBase64 } from "./base64";
import { Request } from "./request";
import { Response } from "./response";

export class ConnectionConfiguration {
    public url: string;
    public debug = false;
}

export class Connection extends ConnectionConfiguration {
    constructor(config: ConnectionConfiguration) {
        super();
        Object.assign(this, config);
    }

    public async send(message: Request): Promise<Response> {
        const { url } = this;
        verbose(`Sending Request: ${message}`);
        if (this.debug) { verbose(`Parsed Request:\n${message.debugString}`); }
        const request = await fetch(url, {
            method: "POST",
            body: encodeBase64(String(message)),
        });
        if (!request.ok) { throw new Error(`Received bad status code ${request.status} from FinTS endpoint.`); }
        const responseString = decodeBase64(await request.text());
        const response = new Response(responseString);
        verbose(`Received Response: ${responseString}`);
        if (this.debug) { verbose(`Parsed Response:\n${response.debugString}`); }
        return response;
    }
}
