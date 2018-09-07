import { Segment, HNSHK, HNVSK, HNVSD, HNSHA, HNHBS, HNHBK } from "./segments";
import { TANMethod } from "./tan";
import { HEADER_LENGTH } from "./constants";

export class RequestConfig {
    public blz: string;
    public name: string;
    public pin: string;
    public tan: string;
    public systemId: string;
    public dialogId: string;
    public msgNo: number;
    public tanMethods: TANMethod[] = [];
    public segments: Segment<any>[] = [];
}

export class Request extends RequestConfig {
    public secRef: number;

    constructor(config: Partial<RequestConfig>) {
        super();
        Object.assign(this, config);
        // Generate `this.secRef`.
        this.secRef = Math.floor(1000000 + Math.random() * 8999999);
    }

    private get hasNo999SecurityFunction() {
        return this.tanMethods.length > 0 && !this.tanMethods.some(method => method.securityFunction === "999");
    }

    private get profileVersion() {
        return this.hasNo999SecurityFunction ? 2 : 1;
    }

    private get securityFunction() {
        return this.hasNo999SecurityFunction ? this.tanMethods[0].securityFunction : "999";
    }

    private get segmentCount() {
        // Add `3` because of:
        // - Not zero-based (0)
        // - HNHBK (1)
        // - HNSHK (2)
        return this.segments.length + 3;
    }

    private get allSegments() {
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

    public get debugString(): string {
        return this.segments.map(segment => segment.debugString).join("\n");
    }

    public toString() {
        return this.allSegments
            .map(segment => String(segment))
            .join("");
    }
}
