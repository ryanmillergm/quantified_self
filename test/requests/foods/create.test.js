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
          .then(response => {
            let newFood = response.body;
            expect(newFood).to.include.all.keys('id', 'calories', 'name');

            expect(newFood.calories).to.equal(200);
            expect(newFood.name).to.equal('frog legs');
          })
          done();
        });

    it('returns a status 400 if no name is given', (done) => {
      request(app)
        .post('/api/v1/foods')
          .send({
            calories: 200
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .then(response => {
            let noNameFood = response.body;
            console.log(noNameFood)
            expect(noNameFood).to.equal(`"name" is required`)
          })
          done();
        })

    it('returns a status 400 if no calories are given', (done) => {
      request(app)
        .post('/api/v1/foods')
          .send({
            name: "frog legs"
          })
          .expect(400)
          .expect('Content-Type', /json/)
          .then(response => {
            let noCalorieFood = response.body;
            expect(noCalorieFood).to.equal(`"calories" is required`)
          })
          done();
        })
  });
});
