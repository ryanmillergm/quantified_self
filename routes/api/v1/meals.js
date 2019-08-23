// const Joi = require("@hapi/joi");
var express = require("express");
var router = express.Router();
var Meal = require("../../../models").Meal;
var Food = require("../../../models").Food;

/*GET all meals*/
router.get("/", function(req, res, next) {
  return Meal.findAll({ include: 'foods'
    // attributes: ["id", "name", "foods", "id", "name", "calories"],
    // include: [{
    //     model: Food,
    //     as: 'foods',
    //     attributes: ["id", "name", "calories"]
    // }]
  })
  .then(meals => {
    res.setHeader("Content-Type", "application/json");
    res
      .status(200)
      .send(
        JSON.stringify(meals, ["id", "name", "foods", "id", "name", "calories"])
      );
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }));
  });
});

module.exports = router;
