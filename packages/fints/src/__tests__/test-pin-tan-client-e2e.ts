import { format } from "date-fns";
import { readFileSync } from "fs";
import * as fetchMock from "fetch-mock";
import { PinTanClient } from "../pin-tan-client";
import { encodeBase64, decodeBase64 } from "../utils";
import { Format } from "../format";

const url = "https://fints.comdirect.com/fints";
const name = "bla";
const pin = "bla";
const blz = "bla";
const productId = "bla";

test("accounts", async () => {
    const startDate = new Date("2018-08-10T12:00:00Z");
    const endDate = new Date("2018-10-10T12:00:00Z");

    const client = new PinTanClient({ blz, name, pin, url, productId });

    const accounts = await client.accounts();
    console.info(accounts); // List of all accounts.

    const statements = await client.statements(accounts[0], startDate, endDate);
    console.info(statements); // List of all statements with transactions in specified date range.
});
