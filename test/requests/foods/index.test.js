var app = require('../../../app');
var request = require("supertest");
var assert = require('assert');
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
        assert.equal(response.statusCode, 200);

        assert.equal(response.body.length, 2);

        let firstFood = response.body[0];
        // expect(Object.keys(firstFood)).toContain('id');
        // expect(Object.keys(firstFood)).toContain('calories');
        // expect(Object.keys(firstFood)).toContain('name');

        assert.equal(firstFood.calories, 10);
        assert.equal(firstFood.name, 'peas');
      })
    });
  });
});