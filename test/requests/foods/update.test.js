var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;

describe('api v1 foods :id PATCH', function () {
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
        expect(response.statusCode).to.equal(202);

        expect(updatedFood.name).to.equal('frog legs')
        expect(updatedFood.calories).to.equal(250)

        expect(updatedFood).to.not.include.key("createdAt");
        expect(updatedFood).to.not.include.key("updatedAt");

        done();
      })
    });

    it('returns 202 when one attribute of the food is successfully updated', (done) => {
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
              name: "frog legs"
            }
          });
      })
      .then(response => {
        let updatedFood = response.body;
        expect(response.statusCode).to.equal(202);

        expect(updatedFood.name).to.equal('frog legs')
        expect(updatedFood.calories).to.equal(10)

        expect(updatedFood).to.not.include.key("createdAt");
        expect(updatedFood).to.not.include.key("updatedAt");

        done();
      })
    });

    it('returns 404 if no food has that id', (done) => {
      request(app)
      .patch('/api/v1/foods/54')
      .then(response => {
        expect(response.statusCode).to.equal(400);

        done();
      })
    });
  });
});
