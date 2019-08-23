// const Joi = require("@hapi/joi");
var express = require("express");
var router = express.Router();
var Meal = require("../../../models").Meal;

/*GET all meals*/
router.get("/", function(req, res, next) {
  return Meal.findAll({
    attributes: ["id", "name", "calories"],
    include: [
      {
        model: Foods
      }
    ]
  })
    .then(meals => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(meals));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify({ error: err }));
    });
});
