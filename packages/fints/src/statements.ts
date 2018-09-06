import { Statement, Transaction } from "mt940-js";

export class Statements {
    public booked: Statement[];
    public pending: Statement[];

    constructor(options: Partial<Statements>) {
        Object.assign(this, options);
    }

    public get bookedTransactions(): Transaction[] {
        return this.booked.reduce((result, statement) => {
            result.push(...statement.transactions);
            return result;
        }, []);
    }

    public get pendingTransactions(): Transaction[] {
        return this.pending.reduce((result, statement) => {
            result.push(...statement.transactions);
            return result;
        }, []);
    }

    public get allTransactions(): Transaction[] {
        return [ ...this.bookedTransactions, ...this.pendingTransactions ];
    }
}
