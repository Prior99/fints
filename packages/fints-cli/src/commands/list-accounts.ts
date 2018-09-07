import { PinTanClient } from "fints";
import { setLevel, info } from "../logger";
import { Command, command, metadata } from "clime";
import { BaseConfig } from "../config";

@command({ description: "List the accounts available for the specified user." })
export default class extends Command {
    @metadata
    public async execute({ verbose, json, serializer, ...config }: BaseConfig) {
        setLevel(verbose);
        const client = new PinTanClient(config);
        const accounts = await client.getSEPAAccounts();
        console.info(serializer(accounts));
    }
}
