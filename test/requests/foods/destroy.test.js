var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;

describe('api v1 foods DELETE', function () {
  describe('user can remove a food from the database', function () {
    it('returns 204 upon deletion', (done) => {
      Food.bulkCreate([
        {
        calories: "10",
        name: "peas"
        },
        {
        calories: "300",
        name: "candy"
        }
      ]).then(() => {
        return Food.findOne({
          where: {name: 'peas'}
        })
      }).then((food) => {
        expect(food.name).to.equal('peas');

        return request(app)
          .del(`/api/v1/foods/${food.id}`)
      }).then(response => {
        expect(response.statusCode).to.equal(204);

        return Food.count()
      }).then((count) => {
        expect(count).to.equal(1);

        done();
      })
    });

    it('returns 404 if no food has that id', (done) => {
      request(app)
        .del('/api/v1/foods/1')
      .then(response => {
        expect(response.statusCode).to.equal(404);

        done();
      })
    });
  });
});
