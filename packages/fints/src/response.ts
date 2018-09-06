import { Segment, HIRMS, HITANS, HNHBK, HIBPA, HISYN, HIRMG, HKTAN, HNVSD } from "./segments";
import { Constructable } from "./types";
import { ReturnValue } from "./return-value";
import { Request } from "./request";
import { parse, unescapeFinTS } from "./utils";
import { TANMethod, tanMethodArgumentMap } from "./tan";

export class Response {
    private segmentStrings: string[][][];

    constructor(data: string) {
        this.segmentStrings = parse(data);
        const hnvsd = this.findSegment(HNVSD);
        if (hnvsd) {
            this.segmentStrings.push(...hnvsd.rawSegments);
        }
    }

    public findSegments<T extends Segment<any>>(segmentClass: Constructable<T>): T[] {
        const matchingStrings = this.segmentStrings.filter(str => str[0][0] === segmentClass.name);
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
        return !Array.from(this.returnValues().values()).some(value => value.error);
    }

    public get errors() {
        return Array.from(this.returnValues().values())
            .filter(value => value.error)
            .map(value => value.message);
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

    public returnValues(...segmentClasses: (Constructable<HIRMG | HIRMS>)[]): Map<number, ReturnValue> {
        const classes = segmentClasses.length === 0 ? [HIRMG, HIRMS] : segmentClasses;
        return classes.reduce((result, currentClass) => {
            const segment = this.findSegment(currentClass);
            if (!segment) { return result; }
            segment.returnValues.forEach((value, key) => result.set(key, value));
            return result;
        }, new Map());
    }

    public get supportedTanMethods(): TANMethod[] {
        const hirms = this.findSegments(HIRMS).find(segment => segment.returnValues.has("3920"));
        const securityFunctions = hirms.returnValues.get("3920").parameters;
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

    public findSegmentForReference<T extends Segment<any>>(segmentClass: Constructable<T>, segment: Segment<any>): T {
        return this.findSegments(segmentClass).find(current => current.reference === segment.segNo);
    }

    public getTouchdowns(request: Request): Map<string, string> {
        return request.segments.reduce((result, requestSegment) => {
            const segment = this.findSegmentForReference(HIRMS, requestSegment);
            if (segment) {
                const returnValue = segment.returnValues.get("3040");
                if (returnValue) {
                    result.set(requestSegment.type, returnValue.parameters[0]);
                }
            }
            return result;
        }, new Map());
    }

    public segmentMaxVersion(segment: Constructable<Segment<any>>) {
        return this.findSegments(segment).reduce((max, current) => current.version > max ? current.version : max, 0);
    }

    public get debugString() {
        return this.segmentStrings.map(segmentString => {
            const split = segmentString;
            return `Type: ${split[0][0]}\n` +
                `Version: ${split[0][2]}\n` +
                `Segment Number: ${split[0][1]}\n` +
                `Referencing: ${split[0].length <= 3 ? "None" : split[0][3]}\n` +
                `----\n` +
                split.slice(1).reduce((result, group, index) => {
                    return result + `DG ${index}: ${Array.isArray(group) ? group.join(", ") : group}\n`;
                }, "");
        }).join("\n");
    }
}
