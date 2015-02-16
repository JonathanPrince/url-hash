'use strict';

var crypto = require('crypto')
  , Url    = require('url');

module.exports = {

  _salt: 'def@au1t5a1t',

  config: function(options){

    this._salt = options.salt || this._salt;

  },

  create: function(url){

    var urlObj = Url.parse(url);

    var hash = crypto.createHash('sha256').update(urlObj.search).digest('hex');

    return url + '&hash=' + hash;

  },

  check: function(url){

    return true;

  }

};
