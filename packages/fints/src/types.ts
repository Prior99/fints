import { Statement as MT940Statement, Transaction as MT940Transaction } from "mt940-js";

export interface Constructable<T> {
    new(...args: any[]): T;
}

export interface PaymentReference {
    raw: string;
    iban?: string;
    bic?: string;
    endToEndRef?: string;
    customerRef?: string;
    mandateRef?: string;
    creditorId?: string;
    originalTurnover?: string;
    interestCompensation?: string;
    paymentReference?: string;
    divergingPrincipal?: string;
    bank?: string;
    back?: string;
    originatorId?: string;
    date?: Date;
    tan?: {
        num: number;
        value: string;
    };
    text?: string;
}

export interface StructuredDescription {
    reference: PaymentReference;
    name: string;
    iban: string;
    text: string;
    bic: string;
    primaNota: string;
}

export interface Section {
    code: number;
    content: string;
}

export interface SEPAAccount {
    iban: string;
    bic: string;
    accountNumber: string;
    subAccount: string;
    blz: string;
}

export interface Transaction extends MT940Transaction {
    descriptionStructured?: StructuredDescription;
}

export interface Statement extends MT940Statement {
    transactions: Transaction[];
}
