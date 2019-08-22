// var request = require("supertest")
// var app = require("../../../app")
// const express = require("express");
// var router = express.Router();
//
// describe('api', () => {
//   describe('api v1 foods update path', () => {
//     test('It should respond to a PATCH request', () => {
//     return request(app).patch("/api/v1/foods/1")
//       .send({food:{name: "Donut", calories: 200}})
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//       });
//     });
//
//     test('It should create a new food object', () => {
//       return request(app).patch("/api/v1/foods/1")
//         .send({food:{name: "Banana", calories: 250}})
//         .then(response => {
//         expect(Object.keys(response.body)).toContain("id");
//         expect(Object.keys(response.body)).toContain("name");
//         expect(Object.keys(response.body)).toContain("calories");
//       });
//     });
//
//     test('It should not create a new food object if invalid calories are passed', () => {
//       return request(app).patch("/api/v1/foods/1")
//         .send({food:{name: "Taco", calories: "NAN"}})
//         .then(response => {
//         expect(response.statusCode).toBe(400);
//         expect(Object.keys(response.body)).toContain("error");
//       });
//     });
//
//     test('It should not create a new food object if no params are passed', () => {
//       return request(app).patch("/api/v1/foods/1")
//       .then(response => {
//         expect(response.statusCode).toBe(406);
//         expect(Object.keys(response.body)).toContain("error");
//       });
//     });
//
//     test('It should not update if an invalid food ID is passed', () => {
//       return request(app).patch("/api/v1/foods/12345")
//       .send({food:{name: "Pizza", calories: 200}})
//       .then(response => {
//         expect(response.statusCode).toBe(404);
//         expect(Object.keys(response.body)).toContain("error");
//       });
//     });
//
//     test('It should not update if no food ID is passed', () => {
//       return request(app).patch("/api/v1/foods/")
//       .send({food:{name: "Pizza", calories: 200}})
//       .then(response => {
//         expect(response.statusCode).toBe(404);
//       });
//     });
//   });
// });
