const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('returns a static HTML page for GET requests to /', function(done) {
    request(app)
      .get('/')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('Example usage:'));
        done();
      });
  });

  it('returns a static HTML page for GET requests to /index.html', function(done) {
    request(app)
      .get('/index.html')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('Example usage:'));
        done();
      });
  });

  it('returns a static CSS file for GET requests to /style.css', function(done) {
    request(app)
      .get('/style.css')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('body {'));
        done();
      });
  });

  it('handles a GET request to /:query with an example unix timestamp', function(done) {
    request(app)
      .get('/1450137600')
      .end((err, response) => {
        assert(response.body.unix === 1450137600);
        assert(response.body.natural === 'December 15, 2015');
        done();
      });
  });

  it('handles a GET request to /:query with an example date', function(done) {
    request(app)
      .get('/December%2015,%202015')
      .end((err, response) => {
        assert(response.body.unix === 1450137600);
        assert(response.body.natural === 'December 15, 2015');
        done();
      });
  });

  it('handles a GET request to /:query with an invalid string date', function(done) {
    request(app)
      .get('/invalid')
      .end((err, response) => {
        assert(response.body.unix === null);
        assert(response.body.natural === null);
        done();
      });
  });

  it('handles a GET request to /:query with another unix timestamp', function(done) {
    request(app)
      .get('/875664000')
      .end((err, response) => {
        assert(response.body.unix === 875664000);
        assert(response.body.natural === 'October 1, 1997');
        done();
      });
  });

  it('handles a GET request to /:query with another date', function(done) {
    request(app)
      .get('/October%201,%201997')
      .end((err, response) => {
        assert(response.body.unix === 875664000);
        assert(response.body.natural === 'October 1, 1997');
        done();
      });
  });

  it('handles a GET request to /:query with a date missing year', function(done) {
    request(app)
      .get('/October%201')
      .end((err, response) => {
        assert(response.body.unix === 1538352000);
        assert(response.body.natural === 'October 1, 2018');
        done();
      });
  });
});
