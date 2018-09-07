import { option } from "clime";
import { parse, subMonths } from "date-fns";
import { PinTanClient } from "fints";
import { setLevel, info } from "../logger";
import { Command, command, metadata } from "clime";
import { BaseConfig } from "../config";
import { Transaction } from "mt940-js";

export class FetchStatementOptions extends BaseConfig {
    @option({ required: true, flag: "i", description: "IBAN of the account to fetch." })
    public iban: string;

    @option({ flag: "s", description: "Date of earliest transaction to fetch." })
    public start: string;

@option({ flag: "e", description: "Date of latest transaction to fetch." })
    public end: string;
}

@command({ description: "Fetch the statements for a specified account." })
export default class extends Command {
    @metadata
    public async execute({ verbose, json, serializer, iban, start, end, ...config }: FetchStatementOptions) {
        const endDate = end ? new Date(end) : new Date();
        if (isNaN(endDate.getTime())) {
            console.error("Invalid start date specified.");
            return;
        }
        const startDate = start ? new Date(start) : subMonths(endDate, 1);
        if (isNaN(startDate.getTime())) {
            console.error("Invalid end date specified.");
            return;
        }
        if (endDate < startDate) {
            console.error("The end date must be after the start date.");
            return;
        }
        setLevel(verbose);
        const client = new PinTanClient(config);
        const accounts = await client.getSEPAAccounts();
        const account = accounts.find(current => current.iban === iban);
        if (!account) {
            console.error("No account with specified iban found.");
            return;
        }
        const statements = await client.getStatements(account, startDate, endDate);
        console.info(serializer(statements.reduce((result: Transaction[], statement) => {
            result.push(...statement.transactions);
            return result;
        }, [])));
    }
}
