import { Parse } from "../parse";
import { SegmentClass } from "./segment";
import { TANMethod, tanMethodArgumentMap } from "../tan";

export class HITANSProps {
    public segNo: number;
    public maxRequests: number;
    public minSignatures: number;
    public securityClass: number;
    public securityProfile: number;
    public oneStepAllowed: boolean;
    public multiple: boolean;
    public tanMethods: TANMethod[];
}

export class HITANS extends SegmentClass(HITANSProps) {
    public type = "HITANS";
    public tanMethods: TANMethod[] = [];

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: (string[] | string)[]) {
        if (![1, 2, 3, 4, 5, 6].includes(this.version)) {
            throw new Error(`Unimplemented TAN method version ${this.version} encountered.`);
        }
        const [
            maxRequests,
            minSignatures,
            securityClass,
            args,
        ] = input;
        const [ oneStepAllowed, multiple, securityProfile, ...restArgs ] = args;
        let tanMethodArgs: string[];
        if (this.version === 1) {
            tanMethodArgs = restArgs.slice(1);
        } else {
            tanMethodArgs = restArgs;
        }
        this.maxRequests = Parse.num(maxRequests as string);
        this.minSignatures = Parse.num(minSignatures as string);
        this.securityClass = Parse.num(securityClass as string);
        this.oneStepAllowed = Parse.bool(oneStepAllowed);
        this.securityProfile = Parse.num(securityProfile);
        this.multiple = Parse.bool(multiple);
        const tanMethodArgumentsLength = tanMethodArgumentMap.get(this.version).length;
        for (let i = 0; i < tanMethodArgs.length; i += tanMethodArgumentsLength) {
            const currentArgs = tanMethodArgs.slice(i, i + tanMethodArgumentsLength);
            this.tanMethods.push(new TANMethod(this.version, currentArgs));
        }
    }
}
