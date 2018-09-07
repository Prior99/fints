import { Segment, HNSHK, HNVSK, HNVSD, HNSHA, HNHBS, HNHBK } from "./segments";
import { TanMethod } from "./tan-method";
import { HEADER_LENGTH } from "./constants";

/**
 * Properties used to constructe a `Request`.
 */
export class RequestConfig {
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
     * An optional TAN for performing this request.
     * Can be omitted if no TAN is needed to perform the request.
     */
    public tan: string;
    /**
     * The system's id. This id needs to be stored across all dialogs and will be assigned
     * by the server at the first request.
     */
    public systemId: string;
    /**
     * The unique id of the message's dialog.
     */
    public dialogId: string;
    /**
     * All messages sent within a dialog are numbered.
     * This requests number.
     */
    public msgNo: number;
    /**
     * A list of allowed TAN methods as configured by the server.
     */
    public tanMethods: TanMethod[] = [];
    /**
     * All segments that should be transmitted in the HNVSD segment of the request.
     */
    public segments: Segment<any>[] = [];
}

/**
 * A single request holding multiple segments.
 * Will likely embedded in a dialog.
 */
export class Request extends RequestConfig {
    /**
     * A unique identifier for linking a signature header to its footer.
     * Needs to be randomly generated and unique per dialog.
     * All references in all segments need to be equal per message.
     */
    public secRef: number;

    constructor(config: Partial<RequestConfig>) {
        super();
        Object.assign(this, config);
        // Generate `this.secRef`.
        this.secRef = Math.floor(1000000 + Math.random() * 8999999);
    }

    /**
     * Determines if a TAN method with a "999" security function is available.
     * This determines whether profile version 2 can be used.
     */
    private get hasNo999SecurityFunction() {
        return this.tanMethods.length > 0 && !this.tanMethods.some(method => method.securityFunction === "999");
    }

    /**
     * Use security profile version 2 if the server supports it.
     * Will be `1` or `2`, depending on the server's capabilities.
     */
    private get profileVersion() {
        return this.hasNo999SecurityFunction ? 2 : 1;
    }

    /**
     * Determines the security function to use. Will default to the first one if the "999" security function is
     * unavailable.
     */
    private get securityFunction() {
        return this.hasNo999SecurityFunction ? this.tanMethods[0].securityFunction : "999";
    }

    /**
     * Returns the total number of segments in this request, including all header meta segments.
     */
    private get segmentCount() {
        // Add `3` because of:
        // - Not zero-based (0)
        // - HNHBK (1)
        // - HNSHK (2)
        return this.segments.length + 3;
    }

    /**
     * An array of all segments, including the HNVSD segment wrapping the user payload segments.
     */
    private get fullSegments() {
        const {
            dialogId,
            secRef,
            blz,
            name,
            systemId,
            profileVersion,
            segmentCount,
            msgNo,
            pin,
            tan,
            securityFunction,
        } = this;
        const segmentsWithoutHeader = [
            new HNVSK({ segNo: 998, blz, name, systemId, profileVersion }),
            new HNVSD({
                segNo: 999,
                segments: [
                    new HNSHK({ segNo: 2, secRef, blz, name, systemId, profileVersion, securityFunction }),
                    ...this.segments,
                    new HNSHA({ segNo: segmentCount, secRef, pin, tan }),
                ],
            }),
            // Add `1` to the index because of HNSHA.
            new HNHBS({ segNo: segmentCount + 1, msgNo }),
        ];
        let length =
            segmentsWithoutHeader.reduce((result, segment) => result + String(segment).length, 0) +
            HEADER_LENGTH +
            dialogId.length +
            String(msgNo).length;
        return [
            new HNHBK({ segNo: 1, msgLength: length, dialogId, msgNo }),
            ...segmentsWithoutHeader,
        ];
    }

    /**
     * Generate a textual representation for debug purposes.
     */
    public get debugString(): string {
        return this.segments.map(segment => segment.debugString).join("\n");
    }

    /**
     * Serialize the whole request into a string that can be sent to the server.
     */
    public toString() {
        return this.fullSegments
            .map(segment => String(segment))
            .join("");
    }
}
