# fints

[![npm](https://img.shields.io/npm/v/fints.svg)](https://www.npmjs.com/package/fints)
[![pipeline status](https://gitlab.com/prior99/fints/badges/master/pipeline.svg)](https://github.com/Prior99/fints)
[![coverage report](https://gitlab.com/prior99/fints/badges/master/coverage.svg)](https://github.com/Prior99/fints)

A client library for communicating with [FinTS servers](https://www.hbci-zka.de/).

## Example

```typescript
import { PinTanClient } from "fints";

const startDate = new Date("2018-08-10T12:00:00Z");
const endDate = new Date("2018-10-10T12:00:00Z");

const client = new PinTanClient({
    url: "https://example.com/fints",
    name: "username",
    pin: 12345,
    blz: 12345678,
});

const accounts = await client.accounts();
console.info(accounts); // List of all accounts.

const statements = await client.statements(accounts[0], startDate, endDate);
console.info(statements); // List of all statements with transactions in specified date range.
```

[Further code examples](README_advanced_usage.md)

## Features

- Load list of accounts.
- Load list of statements and transactions in specified range.
- Parse statement [MT940](https://en.wikipedia.org/wiki/MT940) format.
- Parse transaction descriptions.
- Extract [reference tags](https://www.dzbank.de/content/dam/dzbank_de/de/home/produkte_services/Firmenkunden/PDF-Dokumente/transaction%20banking/elektronicBanking/SEPA-Belegungsregeln_MT940-DK_082016.~644b217ec96b35dfffcaf18dc2df800a.pdf) from transactions.
- List supported TAN methods.
- Parse basic metadata.

## Missing

- Get current balance.
- List holdings.
- Initiate any kind of SEPA transfers or debits.

## Resources

- [API Reference](https://prior99.gitlab.io/fints)
- [Official specification](https://www.hbci-zka.de/spec/3_0.htm)
- [Database of banks with their URLs](https://github.com/jhermsmeier/fints-institute-db)
