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

    return true;

  }

};
