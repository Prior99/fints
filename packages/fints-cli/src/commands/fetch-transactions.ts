import { option } from "clime";
import { FinTSPinTanClient } from "fints";
import { setLevel, info } from "../logger";
import { Command, command, metadata } from "clime";
import { BaseFinTSConfig } from "../config";
import { read } from "mt940-js";
import { readFileSync } from "fs";

export class FetchStatementOptions extends BaseFinTSConfig {
    @option({ required: true, flag: "i", description: "IBAN of the account to fetch." })
    public iban: string;
}

@command({ description: "Fetch the statements for a specified account." })
export default class extends Command {
    @metadata
    public async execute({ verbose, json, serializer, iban, ...config }: FetchStatementOptions) {
        setLevel(verbose);
        const client = new FinTSPinTanClient(config);
        const accounts = await client.getSEPAAccounts();
        const account = accounts.find(current => current.iban === iban);
        if (!account) {
            console.error("No account with specified iban found.");
            return;
        }
        const statements = await client.getStatements(account);
        console.info(serializer(statements.bookedTransactions));
    }
}
