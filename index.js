'use strict';

var crypto = require('crypto')
  , Url    = require('url');

module.exports = {

  _salt: 'def@au1t5a1t',

  config: function(options){

    this._salt = options.salt || this._salt;

  },

  create: function(url){

    return url + '&hash=myHash';

  },

  check: function(url){

    return true;

  }

};
