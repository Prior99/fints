# node-fints

[![npm](https://img.shields.io/npm/v/node-fints.svg)](https://www.npmjs.com/package/node-fints)

A client library for communicating with [FinTS servers](https://www.hbci-zka.de/).

Fork from [fints](https://github.com/Prior99/fints)

Fork from [nodejs-fints](https://github.com/as19git67/nodejs-fints)

## Example

###Typescript Example
```typescript
import { PinTanClient } from "node-fints";

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

###JavaScript Example
```javascript
function getAccountStatements( client, accounts, statements, callback ) {
  for ( let i in accounts ) {
    let account = accounts[i]

    if ( !account.hasOwnProperty( "statementsIsSet" ) || (account.hasOwnProperty( "statementsIsSet" ) && !account.statementsIsSet) ) {
      client
        .statements( account, new Date( moment().subtract( 1, 'day' ).startOf( 'day' ) ), new Date() )
        .then( function( statementsBack ) {
          statements.push( statementsBack )
          account.statementsIsSet = true
          account.statements = ((statementsBack.length > 0) ? statementsBack[0] : {})
          let accountsFilter = accounts.filter( function( account ) {
            return (account.hasOwnProperty( "statementsIsSet" ))
          } )
          if ( accountsFilter.length === accounts.length ) {
            callback( statements, accounts )
            return
          } else {
            getAccountStatements( client, accounts, statements, callback )
          }
        } );
      break
    }
  }
}


const client = new PinTanClient( {
                                   url: "https://example.com/fints",
                                   name: "username",
                                   pin: 12345,
                                   blz: 12345678,
                                 } );
let fintsObject = {
  accounts: null,
  statements: null
}
client.accounts().then( function( accounts ) {
  fintsObject.accounts = accounts
  getAccountStatements( client, accounts, [], ( statements, accountsBack ) => {
    fintsObject.statements = statements;

    console.log( fintsObject );
  } )
} ).catch( ( error ) => {
  console.log( error );
} )
```

##Test Javascript Example with runKit 
[Javascript Example](https://runkit.com/guidomueller/javascript-fints-example)

## nodjs Service Example
Example Application with nodejs middleware and web application for view banking transactions.

###Nodejs application for the fints data processing 
- [cf-banking-fints-example](https://github.com/guidoMueller/cf-banking-fints-example)

- [DEMO](https://cf-banking-fints-example.cfapps.eu10.hana.ondemand.com/)

###IOS Application work with the nodejs application
- [IOS Application](https://apps.apple.com/us/app/unibanking/id1469203913)


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

- [cf-banking-fints-example](https://github.com/guidoMueller/cf-banking-fints-example)
- [Demo Ui Application](https://cf-banking-fints-example.cfapps.eu10.hana.ondemand.com/)
- [IOS Application](https://apps.apple.com/us/app/unibanking/id1469203913)
- [Official specification](https://www.hbci-zka.de/spec/3_0.htm)
- [Database of banks with their URLs](https://github.com/jhermsmeier/fints-institute-db)
