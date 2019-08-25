var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;

describe('api v1 meals meal_id foods DELETE', function () {
  describe('user can remove a food from meal in database', function () {
    it('returns 204 upon deletion', (done) => {
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
      ]).then(() => {
        return Meal.bulkCreate([
          {
            id: 1,
            name: "breakfast"
          },
          {
            id: 2,
            name: "lunch"
          }
        ])
      }).then(() => {
        return MealFood.bulkCreate([
          {
            FoodId: 1,
            MealId: 1
          },
          {
            FoodId: 2,
            MealId: 1
          },
          {
            FoodId: 1,
            MealId: 2
          }
        ])
      }).then(() => {
        return MealFood.count()
      }).then((count) => {
        expect(count).to.equal(3);

        return request(app)
          .del(`/api/v1/meals/1/foods/1`)
      }).then(response => {
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.deep.equal({});

        return MealFood.count()
      }).then(count => {
        expect(count).to.equal(2);

        done();
      });
    });

    it('returns 404 if no meal food has that id', (done) => {
      request(app)
      .del(`/api/v1/meals/12/foods/13`)
      .then(response => {
        expect(response.statusCode).to.equal(404);

        done();
      })
    });
  });
});
