# url-hash
Node library to add hash parameter for tamper-free urls

## Basic Usage

### Add hash to url

```js

// require library
var urlHash = require('url-hash');

var url = 'http://www.domain.com/page/?id=4';

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
