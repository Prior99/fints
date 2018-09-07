import { Parse } from "./parse";

export const tanMethodArgumentMap = new Map<number, string[]>();

tanMethodArgumentMap.set(1, [
    "securityFunction",
    "tanProcess",
    "techId",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
]);

tanMethodArgumentMap.set(2, [
    "securityFunction",
    "tanProcess",
    "techId",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "challengeClassRequired",
    "challengeValueRequired",
]);

tanMethodArgumentMap.set(3, [
    "securityFunction",
    "tanProcess",
    "techId",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "challengeClassRequired",
    "challengeValueRequired",
    "initializationMode",
    "descriptionRequired",
    "supportedMediaNumber",
]);

tanMethodArgumentMap.set(4, [
    "securityFunction",
    "tanProcess",
    "techId",
    "zkaId",
    "zkaVersion",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "smsChargeAccountRequired",
    "challengeClassRequired",
    "challengeValueRequired",
    "challengeStructured",
    "initializationMode",
    "descriptionRequired",
    "supportedMediaNumber",
]);

tanMethodArgumentMap.set(5, [
    "securityFunction",
    "tanProcess",
    "techId",
    "zkaId",
    "zkaVersion",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "smsChargeAccountRequired",
    "principalAccountRequired",
    "challengeClassRequired",
    "challengeValueRequired",
    "initializationMode",
    "descriptionRequired",
    "supportedMediaNumber",
]);

tanMethodArgumentMap.set(6, [
    "securityFunction",
    "tanProcess",
    "techId",
    "zkaId",
    "zkaVersion",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "multiple",
    "tanTimeDialogAssociation",
    "cancellable",
    "smsChargeAccountRequired",
    "principalAccountRequired",
    "challengeClassRequired",
    "challengeStructured",
    "initializationMode",
    "descriptionRequired",
    "hhdUcRequired",
    "supportedMediaNumber",
]);

export class TanMethod {
    public allowedFormat?: string;
    public cancellable?: boolean;
    public challengeClassRequired?: boolean;
    public challengeValueRequired?: boolean;
    public challengeStructured?: boolean;
    public descriptionRequired?: string;
    public hhdUcRequired?: boolean;
    public initializationMode?: string;
    public maxLengthInput?: number;
    public maxLengthReturnvalue?: number;
    public multiple?: boolean;
    public name?: string;
    public numberOfSupportedLists?: number;
    public principalAccountRequired?: boolean;
    public securityFunction?: string;
    public smsChargeAccountRequired?: boolean;
    public supportedMediaNumber?: number;
    public tanListNumberRequired?: boolean;
    public tanProcess?: string;
    public tanTimeDialogAssociation?: string;
    public techId?: string;
    public textReturnvalue?: string;
    public zkaId?: string;
    public zkaVersion?: string;
    public version?: number;

    constructor(version: number, config?: string[]) {
        this.version = version;
        const argumentList = tanMethodArgumentMap.get(version);
        const map = argumentList.reduce((result, argumentName, index) => {
            result.set(argumentName, config[index]);
            return result;
        }, new Map<string, string>());
        this.allowedFormat = map.get("allowedFormat");
        this.cancellable = Parse.bool(map.get("cancellable"));
        this.challengeClassRequired = Parse.bool(map.get("challengeClassRequired"));
        this.challengeValueRequired = Parse.bool(map.get("challengeValueRequired"));
        this.challengeStructured = Parse.bool(map.get("challengeStructured"));
        this.descriptionRequired = map.get("descriptionRequired");
        this.hhdUcRequired = Parse.bool(map.get("hhdUcRequired"));
        this.initializationMode = map.get("initializationMode");
        this.maxLengthInput = Parse.num(map.get("maxLengthInput"));
        this.maxLengthReturnvalue = Parse.num(map.get("maxLengthReturnvalue"));
        this.multiple = Parse.bool(map.get("multiple"));
        this.name = map.get("name");
        this.numberOfSupportedLists = Parse.num(map.get("numberOfSupportedLists"));
        this.principalAccountRequired = map.get("principalAccountRequired") === "2";
        this.securityFunction = map.get("securityFunction");
        this.smsChargeAccountRequired = map.get("smsChargeAccountRequired") === "1";
        this.supportedMediaNumber = Parse.num(map.get("supportedMediaNumber"));
        this.tanListNumberRequired = Parse.bool(map.get("tanListNumberRequired"));
        this.tanProcess = map.get("tanProcess");
        this.tanTimeDialogAssociation = map.get("tanTimeDialogAssociation");
        this.techId = map.get("techId");
        this.textReturnvalue = map.get("textReturnvalue");
        this.zkaId = map.get("zkaId");
        this.zkaVersion = map.get("zkaVersion");
    }
}
