var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;

 describe('api v1 foods POST', function () {
  describe('user can add a food to the database', function () {
    it('returns JSON with id, name and calories', (done) => {
      request(app)
        .post('/api/v1/foods')
          .send({
            food: {
              name: "frog legs",
              calories: 200
            }
          })
          .then(response => {
            let newFood = response.body;
            expect(response.statusCode).to.equal(201)
            
            expect(newFood).to.include.all.keys('id', 'calories', 'name');
            expect(newFood.calories).to.equal(200);
            expect(newFood.name).to.equal('frog legs');

            expect(newFood).to.not.include.key("createdAt");
            expect(newFood).to.not.include.key("updatedAt");

            done();
          })
        });

     it('returns a status 400 if no name is given', (done) => {
      request(app)
        .post('/api/v1/foods')
          .send({
            food: {
              calories: 200
            }
          })
          .then(response => {
            let noNameFood = response.body;
            expect(response.statusCode).to.equal(400)
            expect(noNameFood).to.deep.equal({error: `"name" is required`})
            done();
          })
        })

     it('returns a status 400 if no calories are given', (done) => {
      request(app)
        .post('/api/v1/foods')
          .send({
            food: {
              name: "frog legs"
            }
          })
          .then(response => {
            let noCalorieFood = response.body;
            expect(response.statusCode).to.equal(400)
            expect(noCalorieFood).to.deep.equal({error: `"calories" is required`})
            done();
          })
        })

      it('returns "name must be unique" if the food is already in database', done => {
        request(app)
          .post("/api/v1/foods")
          .send({
            food: {
              name: "Mint",
              calories: 14
            }
          })
          .then(() => {
            request(app)
              .post("/api/v1/foods")
              .send({
                food: {
                  name: "Mint",
                  calories: 30
                }
              })
              .then(response => {
                expect(response.statusCode).to.equal(422);

                expect(response.body.error.errors[0].message).to.equal(
                  "name must be unique"
                );

                done();
              });
          });
      });
  });
});
