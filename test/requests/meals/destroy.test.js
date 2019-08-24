var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;

// DELETE /api/v1/meals/:meal_id/foods/:id

// Removes the food with :id from the meal with :meal_id
//
// This deletes the existing record in the MealFoods table
// that creates the relationship between this food and meal.
// If the meal/food cannot be found, a 404 will be returned.
//
// If successful, this request will return a 204 status code.

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
        return Food.findOne({
          where: {name: 'peas'}
        })
      }).then((food) => {
        expect(food.name).to.equal('peas');

        return request(app)
          .del(`/api/v1/meals/1/foods/${food.id}`)
      }).then(response => {
        expect(response.statusCode).to.equal(204);

      }).then((meal) => {
        console.log(meal)
        expect(meal.food).to.equal([]);

        done();
      })
    });

    it('returns 404 if no food has that id', (done) => {
      request(app)
      .del(`/api/v1/meals/12/foods/13`)
      .then(response => {
        expect(response.statusCode).to.equal(404);

        done();
      })
    });
  });
});

// { id: 1, name: 'breakfast', foods: [ [Object], [Object] ] },
//  { id: 2, name: 'lunch', foods: [ [Object] ] } ]
