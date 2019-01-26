import * as Primitive from './xml-primitives';

// Source files:
// https://raw.githubusercontent.com/hbci4j/hbci4java/master/src/main/resources/pain.001.001.03.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AccountIdentificationSEPA extends BaseType {
	IBAN: string;
}
export interface AccountIdentificationSEPA extends _AccountIdentificationSEPA { constructor: { new(): AccountIdentificationSEPA }; }
export var AccountIdentificationSEPA: { new(): AccountIdentificationSEPA };

export type ActiveOrHistoricCurrencyAndAmount_SimpleTypeSEPA = number;
type _ActiveOrHistoricCurrencyAndAmount_SimpleTypeSEPA = Primitive._number;

interface _ActiveOrHistoricCurrencyAndAmountSEPA extends _ActiveOrHistoricCurrencyAndAmount_SimpleTypeSEPA {
	Ccy: ActiveOrHistoricCurrencyCodeEUR;
}
export interface ActiveOrHistoricCurrencyAndAmountSEPA extends _ActiveOrHistoricCurrencyAndAmountSEPA { constructor: { new(): ActiveOrHistoricCurrencyAndAmountSEPA }; }
export var ActiveOrHistoricCurrencyAndAmountSEPA: { new(): ActiveOrHistoricCurrencyAndAmountSEPA };

export type ActiveOrHistoricCurrencyCode = string;
type _ActiveOrHistoricCurrencyCode = Primitive._string;

export type ActiveOrHistoricCurrencyCodeEUR = "EUR";
interface _ActiveOrHistoricCurrencyCodeEUR extends Primitive._string { content: ActiveOrHistoricCurrencyCodeEUR; }

interface _AmountTypeSEPA extends BaseType {
	InstdAmt: ActiveOrHistoricCurrencyAndAmountSEPA;
}
export interface AmountTypeSEPA extends _AmountTypeSEPA { constructor: { new(): AmountTypeSEPA }; }
export var AmountTypeSEPA: { new(): AmountTypeSEPA };

export type AnyBICIdentifier = string;
type _AnyBICIdentifier = Primitive._string;

export type BatchBookingIndicator = boolean;
type _BatchBookingIndicator = Primitive._boolean;

export type BICIdentifier = string;
type _BICIdentifier = Primitive._string;

interface _BranchAndFinancialInstitutionIdentificationSEPA1 extends BaseType {
	FinInstnId: FinancialInstitutionIdentificationSEPA1;
}
export interface BranchAndFinancialInstitutionIdentificationSEPA1 extends _BranchAndFinancialInstitutionIdentificationSEPA1 { constructor: { new(): BranchAndFinancialInstitutionIdentificationSEPA1 }; }
export var BranchAndFinancialInstitutionIdentificationSEPA1: { new(): BranchAndFinancialInstitutionIdentificationSEPA1 };

interface _BranchAndFinancialInstitutionIdentificationSEPA3 extends BaseType {
	FinInstnId: FinancialInstitutionIdentificationSEPA3;
}
export interface BranchAndFinancialInstitutionIdentificationSEPA3 extends _BranchAndFinancialInstitutionIdentificationSEPA3 { constructor: { new(): BranchAndFinancialInstitutionIdentificationSEPA3 }; }
export var BranchAndFinancialInstitutionIdentificationSEPA3: { new(): BranchAndFinancialInstitutionIdentificationSEPA3 };

interface _CashAccountSEPA1 extends BaseType {
	Ccy?: string;
	Id: AccountIdentificationSEPA;
}
export interface CashAccountSEPA1 extends _CashAccountSEPA1 { constructor: { new(): CashAccountSEPA1 }; }
export var CashAccountSEPA1: { new(): CashAccountSEPA1 };

interface _CashAccountSEPA2 extends BaseType {
	Id: AccountIdentificationSEPA;
}
export interface CashAccountSEPA2 extends _CashAccountSEPA2 { constructor: { new(): CashAccountSEPA2 }; }
export var CashAccountSEPA2: { new(): CashAccountSEPA2 };

interface _CategoryPurposeSEPA extends BaseType {
	Cd: string;
}
export interface CategoryPurposeSEPA extends _CategoryPurposeSEPA { constructor: { new(): CategoryPurposeSEPA }; }
export var CategoryPurposeSEPA: { new(): CategoryPurposeSEPA };

export type ChargeBearerTypeSEPACode = "SLEV";
interface _ChargeBearerTypeSEPACode extends Primitive._string { content: ChargeBearerTypeSEPACode; }

export type CountryCode = string;
type _CountryCode = Primitive._string;

interface _CreditorReferenceInformationSEPA1 extends BaseType {
	/** If a Creditor Reference contains a check digit, the receiving bank is not required to validate this.
	  * If the receiving bank validates the check digit and if this validation fails, the bank may continue its processing and send the transaction to the next party in the chain.
	  * RF Creditor Reference may be used (ISO 11649). */
	Ref: string;
	Tp: CreditorReferenceTypeSEPA;
}
export interface CreditorReferenceInformationSEPA1 extends _CreditorReferenceInformationSEPA1 { constructor: { new(): CreditorReferenceInformationSEPA1 }; }
export var CreditorReferenceInformationSEPA1: { new(): CreditorReferenceInformationSEPA1 };

interface _CreditorReferenceTypeCodeSEPA extends BaseType {
	Cd: DocumentType3CodeSEPA;
}
export interface CreditorReferenceTypeCodeSEPA extends _CreditorReferenceTypeCodeSEPA { constructor: { new(): CreditorReferenceTypeCodeSEPA }; }
export var CreditorReferenceTypeCodeSEPA: { new(): CreditorReferenceTypeCodeSEPA };

interface _CreditorReferenceTypeSEPA extends BaseType {
	CdOrPrtry: CreditorReferenceTypeCodeSEPA;
	Issr?: string;
}
export interface CreditorReferenceTypeSEPA extends _CreditorReferenceTypeSEPA { constructor: { new(): CreditorReferenceTypeSEPA }; }
export var CreditorReferenceTypeSEPA: { new(): CreditorReferenceTypeSEPA };

interface _CreditTransferTransactionInformationSCT extends BaseType {
	Amt: AmountTypeSEPA;
	Cdtr: PartyIdentificationSEPA2;
	CdtrAcct: CashAccountSEPA2;
	CdtrAgt?: BranchAndFinancialInstitutionIdentificationSEPA1;
	/** It is recommended that this element be specified at ‘Payment Information’ level. */
	ChrgBr?: ChargeBearerTypeSEPACode;
	PmtId: PaymentIdentificationSEPA;
	/** If used, it is recommended to be used at ‘Payment Information’ level and not at ‘Credit Transfer Transaction Information’ level. */
	PmtTpInf?: PaymentTypeInformationSCT2;
	Purp?: PurposeSEPA;
	RmtInf?: RemittanceInformationSEPA1Choice;
	UltmtCdtr?: PartyIdentificationSEPA1;
	/** This data element may be present either at ‘Payment Information’ or at ‘Credit Transfer Transaction Information’ level. */
	UltmtDbtr?: PartyIdentificationSEPA1;
}
export interface CreditTransferTransactionInformationSCT extends _CreditTransferTransactionInformationSCT { constructor: { new(): CreditTransferTransactionInformationSCT }; }
export var CreditTransferTransactionInformationSCT: { new(): CreditTransferTransactionInformationSCT };

interface _CustomerCreditTransferInitiationV03 extends BaseType {
	GrpHdr: GroupHeaderSCT;
	PmtInf: PaymentInstructionInformationSCT[];
}
export interface CustomerCreditTransferInitiationV03 extends _CustomerCreditTransferInitiationV03 { constructor: { new(): CustomerCreditTransferInitiationV03 }; }
export var CustomerCreditTransferInitiationV03: { new(): CustomerCreditTransferInitiationV03 };

interface _DateAndPlaceOfBirth extends BaseType {
	BirthDt: Date;
	CityOfBirth: string;
	CtryOfBirth: string;
	PrvcOfBirth?: string;
}
export interface DateAndPlaceOfBirth extends _DateAndPlaceOfBirth { constructor: { new(): DateAndPlaceOfBirth }; }
export var DateAndPlaceOfBirth: { new(): DateAndPlaceOfBirth };

export type DecimalNumber = number;
type _DecimalNumber = Primitive._number;

interface _Document extends BaseType {
	CstmrCdtTrfInitn: CustomerCreditTransferInitiationV03;
}
export interface Document extends _Document { constructor: { new(): Document }; }
export var Document: { new(): Document };

export type DocumentType3CodeSEPA = "SCOR";
interface _DocumentType3CodeSEPA extends Primitive._string { content: DocumentType3CodeSEPA; }

export type ExternalCategoryPurpose1Code = string;
type _ExternalCategoryPurpose1Code = Primitive._string;

export type ExternalOrganisationIdentification1Code = string;
type _ExternalOrganisationIdentification1Code = Primitive._string;

export type ExternalPersonIdentification1Code = string;
type _ExternalPersonIdentification1Code = Primitive._string;

export type ExternalPurpose1Code = string;
type _ExternalPurpose1Code = Primitive._string;

export type ExternalServiceLevel1Code = string;
type _ExternalServiceLevel1Code = Primitive._string;

interface _FinancialInstitutionIdentificationSEPA1 extends BaseType {
	BIC: string;
}
export interface FinancialInstitutionIdentificationSEPA1 extends _FinancialInstitutionIdentificationSEPA1 { constructor: { new(): FinancialInstitutionIdentificationSEPA1 }; }
export var FinancialInstitutionIdentificationSEPA1: { new(): FinancialInstitutionIdentificationSEPA1 };

interface _FinancialInstitutionIdentificationSEPA3 extends BaseType {
	BIC: string;
	Othr: OthrIdentification;
}
export interface FinancialInstitutionIdentificationSEPA3 extends _FinancialInstitutionIdentificationSEPA3 { constructor: { new(): FinancialInstitutionIdentificationSEPA3 }; }
export var FinancialInstitutionIdentificationSEPA3: { new(): FinancialInstitutionIdentificationSEPA3 };

interface _GenericOrganisationIdentification1 extends BaseType {
	Id: string;
	Issr?: string;
	SchmeNm?: OrganisationIdentificationSchemeName1Choice;
}
export interface GenericOrganisationIdentification1 extends _GenericOrganisationIdentification1 { constructor: { new(): GenericOrganisationIdentification1 }; }
export var GenericOrganisationIdentification1: { new(): GenericOrganisationIdentification1 };

interface _GenericPersonIdentification1 extends BaseType {
	Id: string;
	Issr?: string;
	SchmeNm?: PersonIdentificationSchemeName1Choice;
}
export interface GenericPersonIdentification1 extends _GenericPersonIdentification1 { constructor: { new(): GenericPersonIdentification1 }; }
export var GenericPersonIdentification1: { new(): GenericPersonIdentification1 };

interface _GroupHeaderSCT extends BaseType {
	CreDtTm: Date;
	CtrlSum?: number;
	InitgPty: PartyIdentificationSEPA1;
	MsgId: string;
	NbOfTxs: string;
}
export interface GroupHeaderSCT extends _GroupHeaderSCT { constructor: { new(): GroupHeaderSCT }; }
export var GroupHeaderSCT: { new(): GroupHeaderSCT };

export type IBAN2007Identifier = string;
type _IBAN2007Identifier = Primitive._string;

export type ISODate = Date;
type _ISODate = Primitive._Date;

export type ISODateTime = Date;
type _ISODateTime = Primitive._Date;

export type Max140Text = string;
type _Max140Text = Primitive._string;

export type Max15NumericText = string;
type _Max15NumericText = Primitive._string;

export type Max35Text = string;
type _Max35Text = Primitive._string;

export type Max70Text = string;
type _Max70Text = Primitive._string;

interface _OrganisationIdentificationSchemeName1Choice extends BaseType {
	Cd: string;
	Prtry: string;
}
export interface OrganisationIdentificationSchemeName1Choice extends _OrganisationIdentificationSchemeName1Choice { constructor: { new(): OrganisationIdentificationSchemeName1Choice }; }
export var OrganisationIdentificationSchemeName1Choice: { new(): OrganisationIdentificationSchemeName1Choice };

interface _OrganisationIdentificationSEPAChoice extends BaseType {
	BICOrBEI: string;
	Othr: GenericOrganisationIdentification1;
}
export interface OrganisationIdentificationSEPAChoice extends _OrganisationIdentificationSEPAChoice { constructor: { new(): OrganisationIdentificationSEPAChoice }; }
export var OrganisationIdentificationSEPAChoice: { new(): OrganisationIdentificationSEPAChoice };

interface _OthrIdentification extends BaseType {
	Id: OthrIdentificationCode;
}
export interface OthrIdentification extends _OthrIdentification { constructor: { new(): OthrIdentification }; }
export var OthrIdentification: { new(): OthrIdentification };

export type OthrIdentificationCode = "NOTPROVIDED";
interface _OthrIdentificationCode extends Primitive._string { content: OthrIdentificationCode; }

interface _PartyIdentificationSEPA1 extends BaseType {
	Id?: PartySEPAChoice;
	/** ‘Name’ is limited to 70 characters
	  * in length. */
	Nm?: string;
}
export interface PartyIdentificationSEPA1 extends _PartyIdentificationSEPA1 { constructor: { new(): PartyIdentificationSEPA1 }; }
export var PartyIdentificationSEPA1: { new(): PartyIdentificationSEPA1 };

interface _PartyIdentificationSEPA2 extends BaseType {
	Id?: PartySEPAChoice;
	/** ‘Name’ is limited to 70 characters
	  * in length. */
	Nm: string;
	PstlAdr?: PostalAddressSEPA;
}
export interface PartyIdentificationSEPA2 extends _PartyIdentificationSEPA2 { constructor: { new(): PartyIdentificationSEPA2 }; }
export var PartyIdentificationSEPA2: { new(): PartyIdentificationSEPA2 };

interface _PartySEPAChoice extends BaseType {
	/** Either ‘BIC or BEI’ or one
	  * occurrence of ‘Other’ is allowed. */
	OrgId: OrganisationIdentificationSEPAChoice;
	/** Either ‘Date and Place of Birth’ or one occurrence of ‘Other’ is allowed. */
	PrvtId: PersonIdentificationSEPA1Choice;
}
export interface PartySEPAChoice extends _PartySEPAChoice { constructor: { new(): PartySEPAChoice }; }
export var PartySEPAChoice: { new(): PartySEPAChoice };

interface _PaymentIdentificationSEPA extends BaseType {
	EndToEndId: string;
	InstrId?: string;
}
export interface PaymentIdentificationSEPA extends _PaymentIdentificationSEPA { constructor: { new(): PaymentIdentificationSEPA }; }
export var PaymentIdentificationSEPA: { new(): PaymentIdentificationSEPA };

interface _PaymentInstructionInformationSCT extends BaseType {
	/** If present and contains ‘true’, batch booking is requested. If present and contains ‘false’, booking per transaction is requested. If element is not present, pre-agreed customer-to-bank conditions apply. */
	BtchBookg?: boolean;
	CdtTrfTxInf: CreditTransferTransactionInformationSCT[];
	/** It is recommended that this element be specified at ‘Payment Information’ level. */
	ChrgBr?: ChargeBearerTypeSEPACode;
	CtrlSum?: number;
	Dbtr: PartyIdentificationSEPA2;
	DbtrAcct: CashAccountSEPA1;
	DbtrAgt: BranchAndFinancialInstitutionIdentificationSEPA3;
	NbOfTxs?: string;
	PmtInfId: string;
	/** Only ‘TRF’ is allowed. */
	PmtMtd: PaymentMethodSCTCode;
	/** If used, it is recommended to be used only at ‘Payment Information’ level and not at Credit Transfer Transaction Information’ level.
	  * When Instruction Priority is to be used, ‘Payment Type Information’ must be present at ‘Payment Information’ level. */
	PmtTpInf?: PaymentTypeInformationSCT1;
	ReqdExctnDt: Date;
	/** This data element may be present either at ‘Payment Information’ or at ‘Credit Transfer Transaction Information’ level. */
	UltmtDbtr?: PartyIdentificationSEPA1;
}
export interface PaymentInstructionInformationSCT extends _PaymentInstructionInformationSCT { constructor: { new(): PaymentInstructionInformationSCT }; }
export var PaymentInstructionInformationSCT: { new(): PaymentInstructionInformationSCT };

export type PaymentMethodSCTCode = "TRF";
interface _PaymentMethodSCTCode extends Primitive._string { content: PaymentMethodSCTCode; }

interface _PaymentTypeInformationSCT1 extends BaseType {
	/** Depending on the agreement between the Originator and the Originator Bank, ‘Category Purpose’ may be forwarded to the Beneficiary Bank. */
	CtgyPurp?: CategoryPurposeSEPA;
	/** If present, pre-agreed customer-to-bank conditions apply. */
	InstrPrty?: Priority2Code;
	SvcLvl: ServiceLevel;
}
export interface PaymentTypeInformationSCT1 extends _PaymentTypeInformationSCT1 { constructor: { new(): PaymentTypeInformationSCT1 }; }
export var PaymentTypeInformationSCT1: { new(): PaymentTypeInformationSCT1 };

interface _PaymentTypeInformationSCT2 extends BaseType {
	/** Depending on the agreement between the Originator and the Originator Bank, ‘Category Purpose’ may be forwarded to the Beneficiary Bank. */
	CtgyPurp?: CategoryPurposeSEPA;
	SvcLvl: ServiceLevel;
}
export interface PaymentTypeInformationSCT2 extends _PaymentTypeInformationSCT2 { constructor: { new(): PaymentTypeInformationSCT2 }; }
export var PaymentTypeInformationSCT2: { new(): PaymentTypeInformationSCT2 };

interface _PersonIdentificationSchemeName1Choice extends BaseType {
	Cd: string;
	Prtry: string;
}
export interface PersonIdentificationSchemeName1Choice extends _PersonIdentificationSchemeName1Choice { constructor: { new(): PersonIdentificationSchemeName1Choice }; }
export var PersonIdentificationSchemeName1Choice: { new(): PersonIdentificationSchemeName1Choice };

interface _PersonIdentificationSEPA1Choice extends BaseType {
	DtAndPlcOfBirth: DateAndPlaceOfBirth;
	Othr: GenericPersonIdentification1;
}
export interface PersonIdentificationSEPA1Choice extends _PersonIdentificationSEPA1Choice { constructor: { new(): PersonIdentificationSEPA1Choice }; }
export var PersonIdentificationSEPA1Choice: { new(): PersonIdentificationSEPA1Choice };

interface _PostalAddressSEPA extends BaseType {
	AdrLine?: string[];
	Ctry?: string;
}
export interface PostalAddressSEPA extends _PostalAddressSEPA { constructor: { new(): PostalAddressSEPA }; }
export var PostalAddressSEPA: { new(): PostalAddressSEPA };

export type Priority2Code = ("HIGH" | "NORM");
interface _Priority2Code extends Primitive._string { content: Priority2Code; }

interface _PurposeSEPA extends BaseType {
	/** Only codes from the ISO 20022 ExternalPurposeCode list are allowed. */
	Cd: string;
}
export interface PurposeSEPA extends _PurposeSEPA { constructor: { new(): PurposeSEPA }; }
export var PurposeSEPA: { new(): PurposeSEPA };

interface _RemittanceInformationSEPA1Choice extends BaseType {
	Strd: StructuredRemittanceInformationSEPA1;
	Ustrd: string;
}
export interface RemittanceInformationSEPA1Choice extends _RemittanceInformationSEPA1Choice { constructor: { new(): RemittanceInformationSEPA1Choice }; }
export var RemittanceInformationSEPA1Choice: { new(): RemittanceInformationSEPA1Choice };

export type RestrictedIdentificationSEPA1 = string;
type _RestrictedIdentificationSEPA1 = Primitive._string;

interface _ServiceLevel extends BaseType {
	Cd: string;
}
export interface ServiceLevel extends _ServiceLevel { constructor: { new(): ServiceLevel }; }
export var ServiceLevel: { new(): ServiceLevel };

interface _StructuredRemittanceInformationSEPA1 extends BaseType {
	/** When present, the receiving bank is not obliged to validate the the reference information. */
	CdtrRefInf?: CreditorReferenceInformationSEPA1;
}
export interface StructuredRemittanceInformationSEPA1 extends _StructuredRemittanceInformationSEPA1 { constructor: { new(): StructuredRemittanceInformationSEPA1 }; }
export var StructuredRemittanceInformationSEPA1: { new(): StructuredRemittanceInformationSEPA1 };

export interface document extends BaseType {
	Document: Document;
}
export var document: document;
