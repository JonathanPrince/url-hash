'use strict';

var urlHash = require('../index')
  , url     = require('url')
  , expect  = require('expect.js');

describe('url-hash module', function(){

  var baseUrl = 'http://www.domain.com/page/';
  var queryString = '?id=4';

  describe('urlHash.config', function(){

    it('should allow salt to be changed', function(){

      urlHash.config({salt: 'newSalt'});

      expect(urlHash._salt).to.equal('newSalt');

    });

  });

  describe('urlHash.create', function(){

    it('should be a function', function(){

      expect(urlHash.create).to.be.a('function');

    });

    it('should not change base url', function(){

      var result = urlHash.create(baseUrl + queryString).indexOf(baseUrl);

      expect(result).to.equal(0);

    });

    it('should return a url with parameter: hash', function(){

      var hashedUrl = urlHash.create(baseUrl + queryString);

      var urlObject = url.parse(hashedUrl, true);

      var result = urlObject.query.hasOwnProperty('hash');

      expect(result).to.be(true);

    });

  });

});
