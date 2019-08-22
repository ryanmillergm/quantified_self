var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;
var specHelper = require('../../specHelper');

describe('api v1 foods POST', function () {

  describe('user can add a food to the database', function () {
    it('returns JSON with id, name and calories', (done) => {
      request(app)
        .post('/api/v1/foods')
          .send({
            name: "frog legs",
            calories: 200
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) done(err);
            res.body.should.have.property('name');
            res.body.should.have.property('calories');
            res.body.participant.should.have.property("frog legs")
            res.body.participant.should.have.property(200)
            console.log(res.body)
            });
          done();
        })
  });
});
