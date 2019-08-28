# Quantified Self
This REST API has several endpoints for basic CRUD functionality of **foods** and **meals**. Food and meals are joined with **mealfood** with a many to many relationship. All responses are JSON.

See the recipe micro-service repo [here](https://github.com/chakeresa/recipe_microservice). It is deployed at https://recipe-microservice.herokuapp.com/.

The app is deployed at https://nutritionaltracker.herokuapp.com/.

This project was part of [Turing School of Software & Design](https://turing.io)'s Back End Engineering program (Mod 4). See the project spec [here](https://backend.turing.io/module4/projects/quantified_self/qs_server_side). It was completed in 10 days by [Alexandra Chakeres](https://github.com/chakeresa) and [Ryan Miller](https://github.com/ryanmillergm).

View the project board at https://github.com/ryanmillergm/quantified_self/projects/2.

## Schema
![schema](./public/images/schema.png)

## Tech Stack
 - Framework: Express v4.16.4
 - Language: JavaScript
 - Database: PostgreSQL v7.12.1
 - ORM: Sequelize v5.15.1
 - Testing: Mocha v6.2.0 & Chai v4.2.0

## Other Packages
 - Secure ENV variable storage: dotenv
 - Run server using latest file updates: nodemon
 - Run shell commands: shelljs
 - Make HTTP requests in tests: supertest
 - Model validation: joi
 - Test coverage: nyc (Istanbul)

## Local Setup
 - `$ git clone git@github.com:ryanmillergm/quantified_self.git`
 - `$ cd quantified_self`
 - `$ createuser postgres -d`
 - `$ npm install`
 - `$ npx sequelize db:create`
 - `$ npx sequelize db:migrate`

## Running the Server Locally
 - `$ npm start` or `$ nodemon`
 - Access endpoints at `http://localhost:3000`

## Running the Test Suite
 - `$ npm test`

## API Endpoints
### List all foods in the database
Request:
```
GET /api/v1/foods
Accept: application/json
```
Example response:
```
Status: 200
Content-Type: application/json
Body:
[
    {
        "id": 1,
        "name": "peas",
        "calories": 10
    },
    {
        "id": 2,
        "name": "candy bar",
        "calories": 300
    }
]
```
### List one specific food by id in the database
Request:
```
GET /api/v1/foods/:id
Accept: application/json
```
Example response:
```
Status: 200
Content-Type: application/json
Body:
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```
### Create a new food
Request:
```
POST /api/v1/foods
Accept: application/json
```
Both name and calories are required fields. Food names must be unique.
Pass in the following parameters in the body of the request:
```
{
    "food": {
        "name": "Name of food here",
        "calories": "Calories here"
      }
}
```
Example successful response:
```
Status: 200
Content-Type: application/json
Body:
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```
Failed response (did not include name or calorie):
```
Status: 400
Body:
{ "error": '"name" is a required field.' }
```
Failed response (duplicate food name):
```
Status: 422
Body:
{ "error": "That food name is already taken" }
```
### Update an existing food by id in the database
Request:
```
PATCH /api/v1/foods/:id
Accept: application/json
```
Pass in the following parameters in the body of the request:
```
{
    "food":
      {
        "name": "Mint",
        "calories": "14"
      }
}
```
Example response:
```
Status: 200
Content-Type: application/json
Body:
{
    "id": 1,
    "name": "Mint",
    "calories": 14
}
```
### Remove a food from the database (based on the id)
Request (enter the id of the food into `:id`):
```
DELETE /api/v1/foods/:id
```
Successful deletion response:
```
Status: 204
```
Failed deletion response (did not find a food with that id):
```
Status: 404
```

### List all meals in the database (along with their associated foods)
Request:
```
GET /api/v1/meals
Accept: application/json
```
Example response:
```
Status: 200
Content-Type: application/json
Body:
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            }
        ]
    },
    {
        "id": 3,
        "name": "Lunch",
        "foods": []
    }
]
```

### Add an association between an existing meal and an existing food
Request:
```
POST /api/v1/meals/:meal_id/foods/:food_id
Accept: application/json
```
Example successful response:
```
Status: 201
Content-Type: application/json
Body:
{ "message": "Successfully added pancakes to breakfast" }
```
Example failed response (if there is no meal with the ID in the URL):
```
Status: 404
Content-Type: application/json
Body:
{ "error": "No meal found with id 3" }
```
Example failed response (if there is no food with the ID in the URL):
```
Status: 404
Content-Type: application/json
Body:
{ "error": "No food found with id 2" }
```
Example failed response (if the food is already a part of the meal):
```
Status: 422
Content-Type: application/json
Body:
{ "error": "There is already pancakes in breakfast" }

### Deletes a food from a meal in the database
Request:
```
DELETE /api/v1/meals/:meal_id/foods/:id
Accept: application/json
```
Successful Response:
```
Status: 204
```
Failed Response (if there is no MealFood found with the IDs provided in the URL):
```
Status: 404
```

## Core Contributors
 - Alexandra Chakeres, [@chakeresa](https://github.com/chakeresa)
 - Ryan Miller, [@ryanmillergm](https://github.com/ryanmillergm)

### How to Contribute
 - Fork and clone the [repo](https://github.com/ryanmillergm/quantified_self)
 - Make changes on your fork & push them to GitHub
 - Visit https://github.com/ryanmillergm/quantified_self/pulls and click `New pull request`

## Known Issues
 - None
