import { Segment, HNSHK, HNVSK, HNVSD, HNSHA, HNHBS, HNHBK } from "./segments";
import { TANMethod } from "./tan";

export class FinTSMessageConfiguration {
    public blz: string;
    public name: string;
    public pin: string;
    public tan: string;
    public systemId: number;
    public dialogId: number;
    public msgNo: number;
    public tanMethods: TANMethod[] = [];
    public encryptedSegments: Segment<any>[] = [];
}

export class FinTSMessage extends FinTSMessageConfiguration {
    public secRef: number;

    constructor(config: Partial<FinTSMessageConfiguration>) {
        super();
        Object.assign(this, config);
        // Generate secref.
        const rand = Math.floor(1000000 + Math.random() * 8999999);
        this.secRef = rand;
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

    private get signatureEnd() {
        const { segmentCount, secRef, pin, tan } = this;
        return new HNSHA({ segNo: segmentCount, secRef, pin, tan });
    }

    private get header() {
        let length = this.segments.reduce((result, segment) => result + String(segment).length, 0);
        const { dialogId, msgNo } = this;
        return new HNHBK({ segNo: 1, msgLength: length, dialogId, msgNo });
    }

    private get signatureHead() {
        const { secRef, blz, name, systemId, profileVersion, securityFunction } = this;
        return new HNSHK({ segNo: 2, secRef, blz, name, systemId, profileVersion, securityFunction });
    }

    private get encryptionHead() {
        const { secRef, blz, name, systemId, profileVersion } = this;
        return new HNVSK({ segNo: 998, blz, name, systemId, profileVersion });
    }

    private get encryptionEnvelop() {
        return new HNVSD({
            segNo: 999,
            segments: [
                this.signatureHead,
                ...this.encryptedSegments,
                this.signatureEnd,
            ],
        });
    }

    private get end() {
        const { segmentCount, msgNo } = this;
        return new HNHBS({ segNo: segmentCount + 1, msgNo });
    }

    private get segmentCount() {
        return this.encryptedSegments.length + 4;
    }

    public get segments(): Segment<any>[] {
        return [
            this.encryptionHead,
            this.encryptionEnvelop,
            this.end,
        ];
    }

    public toString() {
        return [ this.header, ...this.segments ]
            .map(segment => String(segment))
            .join("");
    }
}
