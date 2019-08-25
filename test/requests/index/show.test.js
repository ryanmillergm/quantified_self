var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;

 describe('welcome page', function () {
  it('returns 200', (done) => {
    request(app)
      .get('/')
    .then(response => {
      expect(response.statusCode).to.equal(200);

      done();
    })
  })
});