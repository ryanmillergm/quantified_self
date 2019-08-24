var app = require("../../../../app");
var request = require("supertest");
var expect = require("chai").expect;
var Food = require("../../../../models").Food;
var Meal = require("../../../../models").Meal;
var MealFood = require("../../../../models").MealFood;

describe("api v1 meals :meal_id foods :id POST", function() {
  describe("user can add an association between a meal and food", function() {
    it("returns a message upon success", done => {
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
      }).then(foods => {
        request(app)
        .post("/api/v1/meals/1/foods/2")
      }).then(response => {
        expect(response.statusCode).to.equal(201);
        
        let body = response.body;
        let expected = { message: "Successfully added candy to breakfast" };
        expect(body).to.deep.equal(expected);

        return MealFood.count();
      }).then((count) => {
        expect(count).to.equal(1);

        done();
      });
    });

    it("returns a status 404 if no meal id matches", done => {
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
        request(app)
          .post("/api/v1/meals/3/foods/1")
      })
      .then(response => {
        expect(response.statusCode).to.equal(404);
        
        let body = response.body;
        let expected = { error: 'No meal found with id 3' };
        expect(body).to.deep.equal(expected);

        done();
      });
    });
    
    it("returns a status 404 if no food id matches", done => {
      Meal.bulkCreate([
        {
          id: 1,
          name: "breakfast"
        },
        {
          id: 2,
          name: "lunch"
        }
      ]).then(() => {
        request(app).post("/api/v1/meals/2/foods/1");
      }).then(response => {
        expect(response.statusCode).to.equal(404);

        let body = response.body;
        let expected = { error: "No food found with id 1" };
        expect(body).to.deep.equal(expected);

        done();
      });
    });
  });
});
