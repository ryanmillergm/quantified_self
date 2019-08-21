var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;
var specHelper = require('../../specHelper');

describe('api v1 foods GET', function () {
  this.timeout(10000);

  before((done) => {
    specHelper.before();
    done();
  });
  beforeEach((done) => {
    specHelper.beforeEach()
    done();
  });

  describe('user can get all foods in database', function () {
    it('returns JSON with id name and calories', () => {
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
        return request(app)
          .get('/api/v1/foods')
      }).then(response => {
        expect(response.statusCode).to.equal(200);

        expect(response.body).to.have.lengthOf(2);

        let firstFood = response.body[0];
        expect(firstFood).to.include.all.keys('id', 'calories', 'name');

        expect(firstFood.calories).to.equal(10);
        expect(firstFood.name).to.equal('peas');
      })
    });

    it('returns 200 if no results', () => {
      request(app)
        .get('/api/v1/foods')
      .then(response => {
        expect(response.statusCode).to.equal(200);

        expect(response.body).to.have.lengthOf(0);
      })
    });
  });
});