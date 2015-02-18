'use strict';

var crypto = require('crypto');

module.exports = {

  _salt:    'def@au1t5a1t',
  _hashKey: 'hash',

  config: function(options){

    this._salt    = options.salt    || this._salt;
    this._hashKey = options.hashKey || this._hashKey;

  },

  create: function(url){

    var hash = crypto.createHash('sha256')
                      .update(url + this._salt)
                      .digest('hex');

    return url += '&' + this._hashKey + '=' + hash;

  },

  check: function(url){

    var hashIndex   = url.indexOf('&' + this._hashKey + '=');
    var hash        = url.slice(hashIndex + this._hashKey.length + 2);
    var testUrl     = url.slice(0, hashIndex);
    var testUrlHash = crypto.createHash('sha256')
                            .update(testUrl + this._salt)
                            .digest('hex');

    return (hash === testUrlHash);

  }

};
