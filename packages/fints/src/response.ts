import { Segment } from "./segments";
import { FinTSRequest } from "./request";
import { splitForDataGroups, splitForDataElements, unescapeFinTS } from "./utils";
import { TANMethod, tanMethodArgumentMap } from "./tan";

export class FinTSResponse {
    private static regexUnwrap = /HNVSD:\d+:\d+\+@\d+@(.+)\'\'/;
    private static regexSegments = /'(?=[A-Z]{4,}:\d|')/;
    private static regexSystemId = /HISYN:\d+:\d+:\d+\+(.+)/;

    private response: string;
    private segments: string[];

    constructor(data: string) {
        this.response = this.unwrap(data);
        this.segments = data.split(FinTSResponse.regexSegments);
    }

    private unwrap(data: string) {
        const result = FinTSResponse.regexUnwrap.exec(data);
        if (result) { return result[1]; }
        return data;
    }

    public get success() {
        const summary = this.summaryBySegment("HIRMG");
        return Array.from(summary.entries()).some(([ key, value ]) => key.startsWith("9"));
    }

    private segmentIndex(index: number, segment: string) {
        const segments = splitForDataGroups(segment);
        return segments.length > index - 1 ? segments[index - 1] : undefined;
    }

    public get dialogId() {
        const segment = this.findSegment("HNHBK");
        if (!segment) {
            throw new Error("Invalid response. Missing \"HNHBK\" segment.");
        }
        return Number(this.segmentIndex(4, segment));
    }

    public get bankName() {
        const segment = this.findSegment("HIBPA");
        if (segment) {
            const parts = splitForDataGroups(segment);
            if (parts.length > 3) {
                return parts[3];
            }
        }
    }

    public get systemId() {
        const segment = this.findSegment("HISYN");
        const result = FinTSResponse.regexSystemId.exec(segment);
        if (!result) {
            throw new Error("Invalid response. Could not find system id.");
        }
        return Number(result[1]);
    }

    public summaryBySegment(segment: "HIRMG" | "HIRMS", name?: string): Map<string, string> {
        if (segment !== "HIRMG" && segment !== "HIRMS") {
            throw new Error("Invalid segment for message summary.");
        }
        let names: string[];
        if (typeof name !== "undefined") {
            names = [name];
        } else {
            names = ["HIRMS", "HIRMG"];
        }
        const result = new Map<string, string>();
        names.forEach(currentName => {
            const currentSegment = this.findSegment(currentName);
            const parts = splitForDataGroups(currentSegment).slice(1);
            parts.forEach(dataElement => result.set(dataElement[0], dataElement[2]));
        });
        return result;
    }

    public get hkkazMaxVersion() {
        return this.segmentMaxVersion("HIKAZS");
    }

    public get hksalMaxVersion() {
        return this.segmentMaxVersion("HISALS");
    }

    public get hktanMaxVersion() {
        return this.segmentMaxVersion("HKTAN");
    }

    public get supportedTanMethods() {
        const segments = this.findSegments("HIRMS");
        const tanMethods: string[] = [];
        segments.forEach(segment => {
            const dataGroups = splitForDataGroups(segment);
            dataGroups.forEach(dataGroup => {
                if (dataGroup.startsWith("3920")) {
                    const dataElements = splitForDataElements(dataGroup);
                    for (let i = 3; i < dataElements.length; ++i) {
                        tanMethods.push(dataElements[i]);
                    }
                }
            });
        });
        const tanSegments = this.findSegments("HITANS");
        const methods: TANMethod[] = [];
        tanSegments.forEach(segment => {
            const dataElements = splitForDataElements(segment);
            let version: number;
            if (dataElements[2] === "1") { version = 1; }
            else if (dataElements[2] === "2") { version = 2; }
            else if (dataElements[2] === "3") { version = 3; }
            else if (dataElements[2] === "4") { version = 4; }
            else if (dataElements[2] === "5") { version = 5; }
            else if (dataElements[2] === "6") { version = 6; }
            else { throw new Error(`Unimplemented TAN method version ${dataElements[2]} encountered.`); }
            const step = tanMethodArgumentMap.get(version).length;
            for (let i = 0; i < Math.floor(dataElements.length / step); ++i) {
                const part = dataElements.slice(6 + i * step, 6 + (i + 1) * step);
                const method = new TANMethod(version, part);
                if (tanMethods.includes(method.securityFunction)) {
                    methods.push(method);
                }
            }
        });
        return methods;
    }

    private findSegmentForReference(name: string, reference: Segment<any>): string {
        const segments = this.findSegments(name);
        return segments.find(segment => {
            const dataElements = splitForDataElements(splitForDataGroups(segment)[0]);
            if (dataElements[3] === String(reference.segNo)) {
                return true;
            }
        });
    }

    private getTouchdowns(msg: FinTSRequest) {
        const touchdown = new Map<string, string>();
        msg.encryptedSegments.forEach(messageSegment => {
            const segment = this.findSegmentForReference("HIRMS", messageSegment);
            if (segment) {
                const dataGroups = splitForDataGroups(segment).slice(1);
                dataGroups.forEach(dataGroup => {
                    const dataElements = splitForDataElements(dataGroup);
                    if (dataElements[0] === "3040") {
                        touchdown.set(messageSegment.type, unescapeFinTS(dataElements[3]));
                    }
                });
            }
        });
    }

    private segmentMaxVersion(name: string) {
        let version = 3;
        const segments = this.findSegments(name);
        segments.forEach(segment => {
            const dataGroups = splitForDataGroups(segment);
            const header = splitForDataElements(dataGroups[0]);
            const currentVersion = parseInt(header[2]);
            if (currentVersion > version) {
                version = currentVersion;
            }
        });
        return version;
    }

    public findSegment(name: string) {
        return this.findSegments(name)[0];
    }

    private findSegments(name: string) {
        return this.segments.filter((segment) => {
            const parts = segment.split(":");
            return parts[0] === name;
        });
    }
}
