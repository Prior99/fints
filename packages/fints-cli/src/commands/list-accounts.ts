import { FinTSClient } from "fints";
import { Command, command, metadata } from "clime";
import { BaseFinTSConfig } from "../config";

class ListAccountsConfig extends BaseFinTSConfig {
}

@command({
    description: "List the accounts available for the specified user.",
})
export default class extends Command {
    public execute(config: ListAccountsConfig) {
        const client = new FinTSClient(config);
    }
}
