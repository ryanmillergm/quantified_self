# Quantified Self
TODO: description

## Core Contributors
 - Alexandra Chakeres, [@chakeresa](https://github.com/chakeresa)
 - Ryan Miller, [@ryanmillergm](https://github.com/ryanmillergm)

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

## Local Setup
 - `$ npm install`
 - `$ npx sequelize db:create`
 - `$ npx sequelize db:migrate`

## Running the Server Locally
 - `$ npm start` or `$ nodemon`

## Running the Test Suite
 - `$ npm test`

## Endpoints
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
