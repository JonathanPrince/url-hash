'use strict';

var urlHash = require('../index')
  , url     = require('url')
  , crypto  = require('crypto')
  , expect  = require('expect.js');

describe('url-hash module', function(){

  var baseUrl = 'http://www.domain.com/page/';
  var queryString = '?id=4';

  describe('urlHash.config', function(){

    it('should allow salt to be changed', function(){

      urlHash.config({salt: 'newSalt'});

      expect(urlHash._salt).to.equal('newSalt');

    });

    it('should allow hash parameter key to be changed', function(){

      urlHash.config({hashKey: 'myHash'});

      expect(urlHash._hashKey).to.equal('myHash');

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

      var result = urlObject.query.hasOwnProperty(urlHash._hashKey);

      expect(result).to.be(true);

    });

    it('hash parameter should be an sha256 hash of the url', function(){

      var expectedHash = crypto
                          .createHash('sha256')
                          .update(baseUrl + queryString + urlHash._salt)
                          .digest('hex');

      var hashedUrl = urlHash.create(baseUrl + queryString);

      var urlObject = url.parse(hashedUrl, true);

      var result = urlObject.query[urlHash._hashKey];

      expect(result).to.equal(expectedHash);

    });

  });

  describe('urlHash.check', function(){

    it('should return true if the url is unchanged', function(){

      var urlToCheck = urlHash.create(baseUrl + queryString);

      var result = urlHash.check(urlToCheck);

      expect(result).to.be(true);

    });

    it('should return false if the url has been changed', function(){

      var urlToCheck = urlHash.create(baseUrl + queryString);

      urlToCheck = urlToCheck.replace('id=4', 'id=5');

      var result = urlHash.check(urlToCheck);

      expect(result).to.be(false);

    });

  });

});
