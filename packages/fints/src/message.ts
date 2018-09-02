import { Segment, HNSHK, HNVSK, HNVSD, HNSHA, HNHBS, HNHBK } from "./segments";
import { TANMethodArgument, TANMethod } from "./models";

export class FinTSMessageConfiguration {
    public blz: string;
    public name: string;
    public pin: string;
    public tan: string;
    public systemId: number;
    public dialogId: string;
    public msgNo: number;
    public tanMethods: TANMethod[] = [];
    public encryptedSegments: Segment[] = [];
}

export class FinTSMessage extends FinTSMessageConfiguration {
    public segments: Segment[] = [];
    public encryptionEnvelop: HNVSD;
    public profileVersion: number;
    public securityFunction: string;
    public secRef: number;

    constructor(config: Partial<FinTSMessageConfiguration>) {
        super();
        Object.assign(this, config);
        if (!this.tanMethods.find(method => method.securityFunction === "999")) {
            this.profileVersion = 2;
            this.securityFunction = this.tanMethods[0].securityFunction;
        } else {
            this.profileVersion = 1;
            this.securityFunction = "999";
        }
        const signatureHead = this.buildSignatureHead();
        const encryptionHead = this.buildEncryptionHead();

        this.encryptionEnvelop = new HNVSD({ segNo: 999, encodedData: "" });

        this.segments.push(encryptionHead);
        this.segments.push(this.encryptionEnvelop);
        this.pushEncryptedSegment(signatureHead);
        this.encryptedSegments = [];
        config.encryptedSegments.forEach(segment => this.pushEncryptedSegment(segment));
        let segmentCount = config.encryptedSegments.length + 3;
        const { secRef, pin, tan, msgNo } = this;
        this.pushEncryptedSegment(new HNSHA({ segNo: segmentCount, secRef, pin, tan }));
        this.segments.push(new HNHBS({ segNo: segmentCount + 1, msgNo }));
    }

    private buildSignatureHead() {
        const rand = Math.floor(1000000 + Math.random() * 8999999);
        this.secRef = rand;
        const { secRef, blz, name, systemId, profileVersion } = this;
        return new HNSHK({ segNo: 2, secRef, blz, name, systemId, profileVersion });
    }

    private buildEncryptionHead() {
        const rand = Math.floor(1000000 + Math.random() * 8999999);
        this.secRef = rand;
        const { secRef, blz, name, systemId, profileVersion } = this;
        return new HNVSK({ segNo: 998, blz, name, systemId, profileVersion });
    }

    private buildHeader() {
        let length = this.segments.reduce((result, segment) => {
            return result + String(segment).length;
        }, 0);
        const { dialogId, msgNo } = this;
        return new HNHBK({ msgLength: length, dialogId, msgNo });
    }

    private pushEncryptedSegment(segment: Segment) {
        this.encryptedSegments.push(segment);
        this.encryptionEnvelop.addData(segment);
    }

    public toString() {
        return String(this.buildHeader()) + this.segments.map(segment => String(segment)).join("");
    }
}
