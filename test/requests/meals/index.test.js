var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;

describe('api v1 meals GET', function () {
  describe('user can get all meals in database', function () {
    it('returns JSON with id name and the associated foods', (done) => {
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
        return request(app)
          .get('/api/v1/meals')
      }).then(response => {

        expect(response.statusCode).to.equal(200);

        expect(response.body).to.have.lengthOf(2);

        let firstMeal = response.body[0];
        expect(firstMeal).to.include.all.keys('id', 'name', 'foods');
        expect(firstMeal).to.not.include.key('createdAt');
        expect(firstMeal).to.not.include.key('updatedAt');

        expect(firstMeal.name).to.equal('breakfast');
        expect(firstMeal.foods).to.have.lengthOf(2);

        let firstFood = firstMeal.foods[0];
        expect(firstFood).to.include.all.keys('id', 'name', 'calories')
        expect(firstFood).to.not.include.key('createdAt');
        expect(firstFood).to.not.include.key('updatedAt');

        done();
      })
    });

    it('returns 200 if no foods', (done) => {
      Meal.bulkCreate([
        {
          name: "breakfast"
        },
        {
          name: "lunch"
        }
      ]).then(() => {
          request(app)
            .get('/api/v1/meals')
            .then(response => {
              expect(response.statusCode).to.equal(200);

              expect(response.body).to.have.lengthOf(2);

              let firstMeal = response.body[0];
              expect(firstMeal.foods).to.deep.equal([]);

              done();
            })
      })
    });

    it('returns 200 if no results', (done) => {
      request(app)
        .get('/api/v1/meals')
        .then(response => {
          expect(response.statusCode).to.equal(200);

          expect(response.body).to.have.lengthOf(0);

          done();
        })
    });
  });
});
