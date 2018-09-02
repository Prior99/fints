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
    "multipleTansAllowed",
    "tanTimeDelayedAllowed",
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
    "multipleTansAllowed",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancelAllowed",
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
    "multipleTansAllowed",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancelAllowed",
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
    "multipleTansAllowed",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancelAllowed",
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
    "multipleTansAllowed",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancelAllowed",
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
    "multipleTansAllowed",
    "tanTimeDialogAssociation",
    "cancelAllowed",
    "smsChargeAccountRequired",
    "principalAccountRequired",
    "challengeClassRequired",
    "challengeStructured",
    "initializationMode",
    "descriptionRequired",
    "hhdUcRequired",
    "supportedMediaNumber",
]);

export class TANMethod {
    public allowedFormat?: string;
    public cancelAllowed?: boolean;
    public challengeClassRequired?: boolean;
    public challengeValueRequired?: boolean;
    public challengeStructured?: boolean;
    public descriptionRequired?: boolean;
    public hhdUcRequired?: boolean;
    public initializationMode?: string;
    public maxLengthInput?: number;
    public maxLengthReturnvalue?: number;
    public multipleTansAllowed?: boolean;
    public name?: string;
    public numberOfSupportedLists?: number;
    public principalAccountRequired?: boolean;
    public securityFunction?: string;
    public smsChargeAccountRequired?: boolean;
    public supportedMediaNumber?: number;
    public tanListNumberRequired?: boolean;
    public tanProcess?: string;
    public tanTimeDelayedAllowed?: boolean;
    public tanTimeDialogAssociation?: string;
    public techId?: string;
    public textReturnvalue?: string;
    public zkaId?: string;
    public zkaVersion?: string;
    public version?: number;

    constructor(version: number, config?: string[]) {
        this.version = version;
        const argmentList = tanMethodArgumentMap.get(version);
        argmentList.forEach((argumentName, index) => (this as any)[argumentName] = config[index]);
    }
}
