var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;

 describe('database test page', function () {
  it('returns 200', (done) => {
    request(app)
      .get('/db')
    .then(response => {
      expect(response.statusCode).to.equal(200);

      done();
    })
  })
});