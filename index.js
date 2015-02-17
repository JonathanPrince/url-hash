'use strict';

var crypto = require('crypto');

module.exports = {

  _salt: 'def@au1t5a1t',

  config: function(options){

    this._salt = options.salt || this._salt;

  },

  create: function(url){

    var hash = crypto.createHash('sha256')
                      .update(url + this._salt)
                      .digest('hex');

    return url += '&hash=' + hash;

  },

  check: function(url){

    var hashIndex   = url.indexOf('&hash=');
    var hash        = url.slice(hashIndex + 6);
    var testUrl     = url.slice(0, hashIndex);
    var testUrlHash = crypto.createHash('sha256')
                            .update(testUrl + this._salt)
                            .digest('hex');

    return (hash === testUrlHash);

  }

};
