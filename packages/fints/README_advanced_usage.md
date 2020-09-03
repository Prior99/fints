### JavaScript Example
```javascript
function getAccountStatements(client, accounts, statements, callback) {
    for (let i in accounts) {
        let account = accounts[i];

        if (
            !account.hasOwnProperty("statementsIsSet") ||
            (account.hasOwnProperty("statementsIsSet") && !account.statementsIsSet)
        ) {
            client
                .statements(account, new Date(moment().subtract(1, "day").startOf("day")), new Date())
                .then(function (statementsBack) {
                    statements.push(statementsBack);
                    account.statementsIsSet = true;
                    account.statements = statementsBack.length > 0 ? statementsBack[0] : {};
                    let accountsFilter = accounts.filter(function (account) {
                        return account.hasOwnProperty("statementsIsSet");
                    });
                    if (accountsFilter.length === accounts.length) {
                        callback(statements, accounts);
                        return;
                    } else {
                        getAccountStatements(client, accounts, statements, callback);
                    }
                });
            break;
        }
    }
}

const client = new PinTanClient({
    url: "https://example.com/fints",
    name: "username",
    pin: 12345,
    blz: 12345678,
});

let fintsObject = {
    accounts: null,
    statements: null,
};
client
    .accounts()
    .then(function (accounts) {
        fintsObject.accounts = accounts;
        getAccountStatements(client, accounts, [], (statements, accountsBack) => {
            fintsObject.statements = statements;

            console.log(fintsObject);
        });
    })
    .catch((error) => {
        console.log(error);
    });
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
