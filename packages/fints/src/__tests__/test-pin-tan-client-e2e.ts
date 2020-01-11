import * as fs from "fs";
import { TanRequiredError } from "../errors/tan-required-error";
import { PinTanClient } from "../pin-tan-client";
import { SEPAAccount } from "../types";

const url = process.env.FINTS_URL;
const name = process.env.FINTS_USER;
const pin = process.env.FINTS_PASSWORD;
const blz = process.env.FINTS_BLZ;

// const url = process.env.COMDIRECT_FINTS_URL;
// const name = process.env.COMDIRECT_FINTS_USER;
// const pin = process.env.COMDIRECT_FINTS_PASSWORD;
// const blz = process.env.COMDIRECT_FINTS_BLZ;

// const url = process.env.ING_DIBA_FINTS_URL;
// const name = process.env.ING_DIBA_FINTS_USER;
// const pin = process.env.ING_DIBA_FINTS_PASSWORD;
// const blz = process.env.ING_DIBA_FINTS_BLZ;

const productId = "9FA6681DEC0CF3046BFC2F8A6";

test.skip("get accounts", async () => {
    const client = new PinTanClient({ blz, name, pin, url, productId, debug: true });
    try {
        const accounts = await client.accounts();
        console.info(accounts); // List of all accounts
        await fs.writeFileSync('/tmp/account.json', JSON.stringify(accounts[0]))
    } catch (error) {
        if (error instanceof TanRequiredError) {
            const hitan = error.hitan;
            fs.writeFileSync('/tmp/hitan-auftragsreferenz.txt', hitan.transactionReference);
            fs.writeFileSync('/tmp/challenge.png', hitan.challengeMedia);
        } else {
            console.error(error);
        }
    }
}, 600000);

test.skip("get statements", async () => {
    const client = new PinTanClient({ blz, name, pin, url, productId, debug: true });
    const account: SEPAAccount = JSON.parse((await fs.readFileSync('/tmp/account.json') as Buffer).toString());

    const startDate = new Date("2019-11-01T12:00:00Z");
    const endDate = new Date("2019-12-09T12:00:00Z");

    try {
        const statements = await client.statements(account, startDate, endDate);
        console.info(statements);
    } catch (error) {
        if (error instanceof TanRequiredError) {
            const hitan = error.hitan;
            await fs.writeFileSync('/tmp/hitan-auftragsreferenz.txt', hitan.transactionReference);
            await fs.writeFileSync('/tmp/challenge.png', hitan.challengeMedia);
        } else {
            console.error(error);
        }
    }
}, 600000);
