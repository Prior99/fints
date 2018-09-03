import { Segment, HIRMS, HITANS, HNHBK, HIBPA, HISYN, HIKAZS, HISALS, HKTAN } from "./segments";
import { Constructable } from "./types";
import { FinTSRequest } from "./request";
import { splitForDataGroups, splitForDataElements, unescapeFinTS } from "./utils";
import { TANMethod, tanMethodArgumentMap } from "./tan";

export class FinTSResponse {
    private static regexUnwrap = /HNVSD:\d+:\d+\+@\d+@(.+)\'\'/;
    private static regexSegments = /'(?=[A-Z]{4,}:\d|')/;
    private static regexSystemId = /HISYN:\d+:\d+:\d+\+(.+)/;

    private segmentStrings: string[];

    constructor(data: string) {
        this.segmentStrings = data.split(FinTSResponse.regexSegments);
    }

    public findSegments<T extends Segment<any>>(segmentClass: Constructable<T>): T[] {
        const matchingStrings = this.segmentStrings.filter(str => str.startsWith(segmentClass.name));
        return matchingStrings.map(segmentString => {
            const segment = new segmentClass(segmentString);
            if (segment.type !== segmentClass.name) {
                throw new Error(
                    `Consistency check failed. Deserializing ${segmentClass.name} returned ${segment.type}.`,
                );
            }
            return segment;
        });

    }

    public findSegment<T extends Segment<any>>(segmentClass: Constructable<T>): T {
        const segments = this.findSegments(segmentClass);
        return segments[0];
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
        const segment = this.findSegment(HNHBK);
        if (!segment) {
            throw new Error("Invalid response. Missing \"HNHBK\" segment.");
        }
        return segment.dialogId;
    }

    public get bankName() {
        const segment = this.findSegment(HIBPA);
        if (segment) { return segment.bankName; }
    }

    public get systemId() {
        const segment = this.findSegment(HISYN);
        if (!segment) { throw new Error("Invalid response. Could not find system id."); }
        return segment.systemId;
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
        return this.segmentMaxVersion(HIKAZS);
    }

    public get hksalMaxVersion() {
        return this.segmentMaxVersion(HISALS);
    }

    public get hktanMaxVersion() {
        return this.segmentMaxVersion(HKTAN);
    }

    public get supportedTanMethods() {
        const hirms = this.findSegments(HIRMS).find(segment => segment.responses.has(3920));
        const securityFunctions = hirms.responses.get(3920).parameters;
        const tanSegments = this.findSegments(HITANS);
        return tanSegments.reduce((result, segment) => {
            segment.tanMethods.forEach(tanMethod => {
                if (securityFunctions.includes(tanMethod.securityFunction)) {
                    result.push(tanMethod);
                }
            });
            return result;
        }, []);
    }

    private findSegmentForReference<T extends Segment<any>>(segmentClass: Constructable<T>, segment: Segment<any>): T {
        return this.findSegments(segmentClass).find(current => current.reference === segment.segNo);
    }

    private getTouchdowns(msg: FinTSRequest): Map<string, string> {
        return msg.segments.reduce((result, messageSegment) => {
            const segment = this.findSegmentForReference(HIRMS, messageSegment);
            if (segment) {
                segment.responses.get(3040);
                result.set(messageSegment.type, segment.responses.get(3040).parameters[0]);
            }
            return result;
        }, new Map());
    }

    private segmentMaxVersion(segment: Constructable<Segment<any>>) {
        return this.findSegments(segment).reduce((max, current) => current.version > max ? current.version : max, 0);
    }
}
