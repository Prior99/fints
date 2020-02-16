import "isomorphic-fetch";
import { verbose } from "./logger";
import { encodeBase64, decodeBase64 } from "./utils";
import { Request } from "./request";
import { Response } from "./response";
import { Connection } from "./types";

/**
 * Configuration specifying how to reach the fints server.
 */
export class ConnectionConfig {
    /**
     * The URL to reach the server at.
     */
    public url: string;
    /**
     * If set to `true`, will log all requests performed and responses received.
     */
    public debug = false;
}

/**
 * A connection used by clients to reach the fints server.
 */
export class HttpConnection extends ConnectionConfig implements Connection {
    constructor(config: ConnectionConfig) {
        super();
        Object.assign(this, config);
    }

    public async send(request: Request): Promise<Response> {
        const { url } = this;
        verbose(`Sending Request: ${request}`);
        if (this.debug) { verbose(`Parsed Request:\n${request.debugString}`); }
        const httpRequest = await fetch(url, {
            method: "POST",
            body: encodeBase64(String(request)),
        });
        if (!httpRequest.ok) { throw new Error(`Received bad status code ${httpRequest.status} from FinTS endpoint.`); }

        const responseString = decodeBase64(await httpRequest.text());
        verbose(`Received Response: ${responseString}`);
        const response = new Response(responseString);
        if (this.debug) { verbose(`Parsed Response:\n${response.debugString}`); }
        return response;
    }
}
