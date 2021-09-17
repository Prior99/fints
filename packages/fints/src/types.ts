import { Statement as MT940Statement, Transaction as MT940Transaction } from "mt940-js";
import { Request } from "./request";
import { Response } from "./response";

export interface Constructable<T> {
    new (...args: any[]): T;
}

/**
 * A payment reference as wrapped in a structured description in the 86 section of the MT 940 format.
 * Most properties will likely be `undefined` if no matching tags were found.
 */
export interface PaymentReference {
    /**
     * The unprocessed, raw payment reference as a string.
     */
    raw: string;
    /**
     * The principal's IBAN (IBAN+ tag).
     */
    iban?: string;
    /**
     * The principal's BIC (BIC+ tag).
     */
    bic?: string;
    /**
     * End to end reference of the transaction (EREF+ tag).
     */
    endToEndRef?: string;
    /**
     * Customer reference (KREF+).
     */
    customerRef?: string;
    /**
     * Mandate reference (MREF+). Specified if the transaction was a debit.
     */
    mandateRef?: string;
    /**
     * Creditor identification (CRED+). Specified if the transaction was a debit.
     */
    creditorId?: string;
    /**
     * Original amount of turnover (OAMT+). Specified if the transaction was a return.
     */
    originalTurnover?: string;
    /**
     * Interest compensation (COAM+). Specified if the transaction was a return.
     */
    interestCompensation?: string;
    /**
     * Specified if the principal of the transaction was diverging (ABWA+).
     */
    divergingPrincipal?: string;
    /**
     * Bank identification reference (BREF+).
     */
    bank?: string;
    /**
     * Return reference (RREF+). Specified if the transaction was a return.
     */
    back?: string;
    /**
     * The originator's id (DEBT+).
     */
    originatorId?: string;
    /**
     * The transaction's date (DATUM).
     */
    date?: Date;
    /**
     * The tan associated with the transaction (TAN).
     */
    tan?: {
        num: number;
        value: string;
    };
    /**
     * The principal's specified payment reference (description text of the transaction) (SVWZ+).
     */
    text?: string;
    /** Purpose code */
    purpose?: string;
}

/**
 * A parsed structure from the description in the 86 section of a MT940 list of s
 */
export interface StructuredDescription {
    /**
     * Payment reference. Can be a parsed structure using tags or only contain the textual representation in the
     * property named `raw`.
     */
    reference: PaymentReference;
    /**
     * The name of the principal or benefitiary.
     */
    name: string;
    /**
     * The IBAN of the principal or benefitiary.
     */
    iban: string;
    /**
     * The textual, not parsed representation of the description.
     */
    text: string;
    /**
     * The BIC of the principal or benefitiary.
     */
    bic: string;
    /**
     * The prima nota associated with this transaction.
     * Used by some german banks. See: https://de.wikipedia.org/wiki/Primanota
     */
    primaNota: string;
}

/**
 * An unparsed raw sub section from the structured 86 section.
 */
export interface Section {
    /**
     * The section's code.
     */
    code: number;
    /**
     * The section's raw content.
     */
    content: string;
}

/**
 * A single SEPA account.
 */
export interface SEPAAccount {
    /**
     * The account's IBAN.
     */
    iban: string;
    /**
     * The account's BIC.
     */
    bic: string;
    /**
     * The account's internal account number used together with the BLZ before SEPA.
     */
    accountNumber: string;
    /**
     * An optional sub account identification.
     */
    subAccount?: string;
    /**
     * The account's BLZ used together with the account number before SEPA.
     */
    blz: string;
    /**
     * Name of the account owner if known
     */
    accountOwnerName?: string;

    accountName?: string;

    limitValue?: number;
}

/**
 * A single SEPA account.
 */
export interface SEPAAccountHiupd {
    accountNumber: string;
    iban: string;
    accountOwnerName1: string;
    accountName: string;
    limitValue: string;
}

/**
 * A single standing order.
 */
export interface StandingOrder {
    /**
     * The next time this standing order will trigger a transaction.
     */
    nextOrderDate: Date;
    /**
     * Unit of the order-interval.
     */
    timeUnit: string;
    /**
     * Interval of repeating transactions.
     */
    interval: number;
    /**
     * Day in month when transaction is triggered.
     */
    orderDay?: number;
    /**
     * The last time this standing order will trigger a transaction.
     */
    lastOrderDate?: Date;
    /**
     * Creation date of this standing order.
     */
    creationDate: Date;
    /**
     * The debitor.
     */
    debitor: PartyIdentification;
    /**
     * The creditor.
     */
    creditor: PartyIdentification;
    /**
     * The amount of every transaction.
     */
    amount: number;
    /**
     * The payment purpose (text of the transaction).
     */
    paymentPurpose: string;
}

/**
 * Represents a creditor or debitor identification object.
 */
export interface PartyIdentification {
    /**
     * Name of the party.
     */
    name: string;
    /**
     * IBAN of the party.
     */
    iban: string;
    /**
     * BIC of the party.
     */
    bic: string;
}

/**
 * An augmented version of the `mt940-js` `Transaction` with an added parsed
 * version of structured 86 fields.
 */
export interface Transaction extends MT940Transaction {
    descriptionStructured?: StructuredDescription;
}

/**
 * An augmented version of the `mt940-js` `Statement` with an added parsed
 * version of structured 86 fields on each transaction.
 */
export interface Statement extends MT940Statement {
    transactions: Transaction[];
}

/**
 * Represents the balance for a single SEPA account.
 */
export interface Balance {
    /**
     * The SEPA account, this balance belongs to.
     */
    account: SEPAAccount;
    /**
     * The product name of this account.
     */
    productName: string;
    /**
     * The currency of this account.
     */
    currency: string;
    /**
     * Balance which is already booked of this account.
     */
    bookedBalance: number;
    /**
     * Balance of pending transactions of this account.
     */
    pendingBalance: number;
    /**
     * Available credit limit of this account.
     */
    creditLimit: number;
    /**
     * Balance which is accessible for this account.
     */
    availableBalance: number;
}

/**
 * A connection used in the client to contact the server.
 */
export interface Connection {
    /**
     * Send a request to the server and return the response received.
     *
     * @param request Request to send to the server.
     *
     * @return The response received from the server.
     */
    send(request: Request): Promise<Response>;
}
