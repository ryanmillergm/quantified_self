var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;

describe('api v1 foods UPDATE', function () {
  describe('user can update a food from the database', function () {
    it('returns 202 when food is successfully updated', (done) => {
      Food.bulkCreate([
        {
        id: 1,
        calories: "10",
        name: "peas"
        },
        {
        id: 2,
        calories: "300",
        name: "candy"
        }
      ])
      .then(() => {
        return request(app)
          .patch(`/api/v1/foods/1`)
          .send({
            food: {
              name: "frog legs",
              calories: 250
            }
          })
      })
      .then(response => {
        let updatedFood = response.body;
        console.log(updatedFood)
        expect(response.statusCode).to.equal(202);
        expect(updatedFood.name).to.equal('frog legs')
        expect(updatedFood.calories).to.equal(250)
      done();
      })
    });

    it('returns 404 if no food has that id', (done) => {
      request(app)
      .patch('/api/v1/foods/54')
      .then(response => {
        console.log(response.statusCode)
        console.log(response.body)
        expect(response.statusCode).to.equal(400);

        done();
      })
    });
  });
});
