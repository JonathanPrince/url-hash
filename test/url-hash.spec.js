'use strict';

var urlHash = require('../index')
  , url     = require('url')
  , expect  = require('expect.js');

describe('url-hash module', function(){

  var baseUrl = 'http://www.domain.com/page/';
  var queryString = '?id=4';

  describe('urlHash.create', function(){

    it('should be a function', function(){

      expect(urlHash.create).to.be.a('function');

    });

    it('should return a url with parameter: hash', function(){

      var hashedUrl = urlHash.create(baseUrl + queryString);

      var urlObject = url.parse(hashedUrl, true);

      var result = urlObject.query.hasOwnProperty('hash');

      expect(result).to.be(true);

    });

  });

});
