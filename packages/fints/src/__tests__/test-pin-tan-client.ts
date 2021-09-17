import { format } from "date-fns";
import { readFileSync } from "fs";
import fetchMock from "fetch-mock";
import { PinTanClient } from "../pin-tan-client";
import { encodeBase64, decodeBase64 } from "../utils";
import { Format } from "../format";

const url = "https://example.com/fints";
const name = "test1";
const pin = "12345";
const blz = "12345678";
const productId = "fints";

let client: PinTanClient;

beforeEach(() => {
    jest.spyOn(Format, "date").mockImplementation(date => date ? format(date, "HHMMss") : "20180101");
    jest.spyOn(Format, "time").mockImplementation(time => time ? format(time, "HHMMss") : "120000");
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    client = new PinTanClient({ blz, name, pin, url, productId });
});

test("accounts", async () => {
    const responseFixtures: string[] = JSON.parse(readFileSync(`${__dirname}/fixture-accounts.json`, "utf8"));
    let responseNo = 0;
    const mock = fetchMock.post(url, () => {
        const response = encodeBase64(responseFixtures[responseNo]);
        responseNo++;
        return response;
    });

    const result = await client.accounts();
    expect(result).toMatchSnapshot();
    const calls = (mock.calls() as any).map((call: any) => decodeBase64(String(call[1].body)));
    expect(calls).toMatchSnapshot();
    mock.restore();
});

test("statements", async () => {
    const responseFixtures: string[] = JSON.parse(readFileSync(`${__dirname}/fixture-statements.json`, "utf8"));
    let responseNo = 0;
    const mock = fetchMock.post(url, () => {
        const response = encodeBase64(responseFixtures[responseNo]);
        responseNo++;
        return response;
    });
    const account = {
        accountNumber: "2",
        bic: "GENODE00TES",
        blz: "12345678",
        iban: "DE111234567800000002",
        subAccount: "",
    };
    const result = await client.statements(account, new Date("2018-01-01T12:00:00Z"), new Date("2018-10-01T12:00:00Z"));
    expect(result).toMatchSnapshot();
    const calls = (mock.calls() as any).map((call: any) => decodeBase64(String(call[1].body)));
    expect(calls).toMatchSnapshot();
    mock.restore();
});

test("balance", async () => {
    const responseFixtures: string[] = JSON.parse(readFileSync(`${__dirname}/fixture-balance.json`, "utf8"));
    let responseNo = 0;
    const mock = fetchMock.post(url, () => {
        const response = encodeBase64(responseFixtures[responseNo]);
        responseNo++;
        return response;
    });
    const account = {
        accountNumber: "2",
        bic: "GENODE00TES",
        blz: "12346789",
        iban: "DE111234567800000002",
        subAccount: "",
    };
    const result = await client.balance(account);
    expect(result).toMatchSnapshot();
    const calls = (mock.calls() as any).map((call: any) => decodeBase64(String(call[1].body)));
    expect(calls).toMatchSnapshot();
    mock.restore();
});

test("standingOrders", async () => {
    let responseFixtures: string[] = JSON.parse(readFileSync(`${__dirname}/fixture-standingOrders.json`, "utf8"));
    let responseNo = 0;
    const mock = fetchMock.post(url, () => {
        const response = encodeBase64(responseFixtures[responseNo]);
        responseNo++;
        return response;
    });
    const account = {
        accountNumber: "2",
        bic: "DEUTDEFF500",
        blz: "12346789",
        iban: "DE27100777770209299700",
        subAccount: "",
    };
    const result = await client.standingOrders(account);
    expect(result).toMatchSnapshot();
    const calls = (mock.calls() as any).map((call: any) => decodeBase64(String(call[1].body)));
    expect(calls).toMatchSnapshot();
    mock.restore();
});
