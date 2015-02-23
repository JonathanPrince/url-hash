# url-hash
Node library to add hash parameter for tamper-free urls

**NOTE:**
This module is not intended for applications involving sensitive data.
It provides a simple restriction to avoid tampering with url parameters,
or to add a basic expiry time to a link.

## Basic Usage

### Add hash to url

```js

// require library
var urlHash = require('url-hash');

var url = 'http://www.example.com/page?id=4';

// add hash to url
var newUrl = urlHash.create(url);

```

### Verify Url

```js

// require library
var urlHash = require('url-hash');

// check integrity of url
var result = urlHash.check(url/to/verify);

/*

  result will either:
  1. equal true if the url is unchanged
  2. equal false if the url has been changed

*/
```

## Configuration options

This library currently offers the following configuration options:

- salt
- expire
- hash key name

```js

urlHash.config({
                salt:    'someUniqueCustomSalt', // use custom salt (recommended)
                expire:  60000,                  // url expires after 1 minute
                hashKey: 'myCustomHashKeyName'   // use custom name for hash parameter
              });

```
