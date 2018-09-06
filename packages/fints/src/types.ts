export interface Constructable<T> {
    new(...args: any[]): T;
}

export interface SEPAAccount {
    iban: string;
    bic: string;
    accountNumber: string;
    subAccount: string;
    blz: string;
}
