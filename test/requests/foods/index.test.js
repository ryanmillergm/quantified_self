var request = require("supertest");
var assert = require('assert');
var Food = require('../../../models').Food;
var specHelper = require('../../specHelper');

before((done) => specHelper.before(done));
beforeEach((done) => specHelper.beforeEach(done));
// afterEach((done) => specHelper.afterEach(done));
// after((done) => specHelper.after(done));

describe('api v1 foods GET', function () {
  describe('user can get all foods in database', function () {
    it('returns JSON with id name and calories', function (done) {
      console.log("hello!!");
      return Food.bulkCreate([
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
        // expect(typeof response.body).toEqual(Array);
        // firstFood = response.body.first
        // expect(Object.keys(firstFood)).toContain('id');
        // expect(Object.keys(firstFood)).toContain('calories');
        // expect(firstFood.calories).toEqual(10);
        // expect(Object.keys(firstFood)).toContain('name');
        // expect(firstFood.name).toEqual('peas');

        done();
      })
    });
  });
});