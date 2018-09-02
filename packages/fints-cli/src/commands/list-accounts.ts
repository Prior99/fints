import { FinTSPinTanClient } from "fints";
import { Command, command, metadata } from "clime";
import { BaseFinTSConfig } from "../config";

class ListAccountsConfig extends BaseFinTSConfig {
}

@command({
    description: "List the accounts available for the specified user.",
})
export default class extends Command {
    @metadata
    public async execute(config: ListAccountsConfig) {
        const client = new FinTSPinTanClient(config);
        const accounts = await client.getSEPAAccounts();
        console.warn(accounts);
    }
}
