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

    it('should be possible to set link expiry', function(){

      var expiryTime = 60000;

      urlHash.config({expire: expiryTime});

      expect(urlHash._expire).to.equal(expiryTime);

    });

    it('should allow expire parameter key to be changed', function(){

      urlHash.config({expKey: 'myExpiry'});

      expect(urlHash._expKey).to.equal('myExpiry');

      urlHash.config({expKey: 'expire'});

    });

  });

  describe('resetExpiry', function(){

    it('should set _expire to 0', function(){

      urlHash.resetExpiry();

      expect(urlHash._expire).to.be(0);

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

    it('should add expire parameter if _expire has been set', function(){

      urlHash.config({expire: 60000});

      var testUrl = urlHash.create(baseUrl + queryString);

      var result = testUrl.indexOf('&expire=');

      expect(result).to.be.above(0);

    });

    it('should not add expire parameter if _expire is 0', function(){

      urlHash.resetExpiry();

      var testUrl = urlHash.create(baseUrl + queryString);

      var result = testUrl.indexOf('&expire=');

      expect(result).to.be(-1);

    });

  });

  describe('urlHash.check without callback argument', function(){

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

    it('should return false if link has expired', function(){

      //  set expiry time to 1/4 second before creation
      urlHash.config({expire: -250});

      var urlToCheck = urlHash.create(baseUrl + queryString);

      var result = urlHash.check(urlToCheck);

      expect(result).to.be(false);

    });

    it('should return true if link has not expired', function(){

      urlHash.config({expire: 250});

      var urlToCheck = urlHash.create(baseUrl + queryString);

      var result = urlHash.check(urlToCheck);

      expect(result).to.be(true);

      urlHash.resetExpiry();

    });

  });

  describe('urlHash.check with callback argument', function(){

    it('should call callback(true) if the url is unchanged', function(){

      var result, urlToCheck = urlHash.create(baseUrl + queryString);

      urlHash.check(urlToCheck, function(res){
        result = res;
      });

      expect(result).to.be(true);

    });

    it('should call callback(false) if the url has been changed', function(){

      var result, urlToCheck = urlHash.create(baseUrl + queryString);

      urlToCheck = urlToCheck.replace('id=4', 'id=5');

      urlHash.check(urlToCheck, function(res){
        result = res;
      });

      expect(result).to.be(false);

    });

    it('should call callback(false) if link has expired', function(){

      //  set expiry time to 1/4 second before creation
      urlHash.config({expire: -250});

      var result, urlToCheck = urlHash.create(baseUrl + queryString);

      urlHash.check(urlToCheck, function(res){
        result = res;
      });

      expect(result).to.be(false);

    });

    it('should call callback(true) if link has not expired', function(){

      urlHash.config({expire: 250});

      var result, urlToCheck = urlHash.create(baseUrl + queryString);

      urlHash.check(urlToCheck, function(res){
        result = res;
      });

      expect(result).to.be(true);

      urlHash.resetExpiry();

    });

  });

});
