# fints-cli

A command line interface for communicating with [FinTS servers](https://www.hbci-zka.de/).


## Features

- Load list of accounts.
- Load list of transactions in specified range.

### List accounts

```
  List the accounts available for the specified user.

  USAGE

    fints list-accounts --url <url> --name <name> --pin <pin> --blz <blz> [...options]

  OPTIONS

    -u, --url <url>   -  endpoint URL.                
    -n, --name <name> - Username used for connecting. 
    -p, --pin <pin>   - Pin used for connecting.      
    -b, --blz <blz>   - BLZ of the bank to connect to.
    -d, --debug      
    -v, --verbose    
    -j, --json       
```

```
fint-cli list-accounts --url https://example.com/fints -n username -p 12345 -b 12345678
```

### Fetching transactions

```
  Fetch the statements for a specified account.

  USAGE

    fints fetch-transactions --url <url> --name <name> --pin <pin> --blz <blz> --iban <iban> [...options]

  OPTIONS

    -u, --url <url>     -  endpoint URL.                        
    -n, --name <name>   - Username used for connecting.         
    -p, --pin <pin>     - Pin used for connecting.              
    -b, --blz <blz>     - BLZ of the bank to connect to.        
    -d, --debug        
    -v, --verbose      
    -j, --json         
    -i, --iban <iban>   - IBAN of the account to fetch.         
    -s, --start <start> - Date of earliest transaction to fetch.
    -e, --end <end>     - Date of latest transaction to fetch.  
```

```
./fints-cli fetch-transactions --url http://example.com/fints -n username -p 12345 -b 12345678 -i DE111234567800000001 -s 2018-01-01 -e 2018-10-01
```

## Resources

- [Database of banks with their URLs](https://github.com/jhermsmeier/fints-institute-db)
