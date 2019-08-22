var app = require('../../../app');
var request = require("supertest");
var expect = require('chai').expect;
var Food = require('../../../models').Food;

describe('api v1 foods GET', function () {
  describe('user can get one specific food in database', function () {
    it('returns JSON with id, name and calories', (done) => {
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
        },
        {
        id: 3,
        calories: "200",
        name: "frog legs"
        }
      ]).then(() => {
        return request(app)
          .get('/api/v1/foods/3')
      }).then(response => {
        console.log(response.body)
        expect(response.statusCode).to.equal(200);

        let specificFood = response.body;
        expect(specificFood).to.include.all.keys('id', 'calories', 'name');
        expect(specificFood).to.not.include.key('createdAt');
        expect(specificFood).to.not.include.key('updatedAt');

        expect(specificFood.calories).to.equal(200);
        expect(specificFood.name).to.equal('frog legs');

        done();
      })
    });

    it('returns 404 if no food is found', (done) => {
      request(app)
        .get('/api/v1/foods/5')
      .then(response => {
        this.timeout(10000);
        expect(response.statusCode).to.equal(404);

        expect(response.body).to.equal({ error: 'That food does not exist' });

        done();
      })
      done();
    });
  });
});
