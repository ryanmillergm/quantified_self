// const Joi = require("@hapi/joi");
var express = require("express");
var router = express.Router();
var Meal = require("../../../models").Meal;
var Food = require("../../../models").Food;
var MealFood = require("../../../models").MealFood;

/*GET all meals*/
router.get("/", function(req, res, next) {
  return Meal.findAll({ include: 'foods'})
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

/*POST new MealFood association*/
router.post("/:mealId/foods/:foodId", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var mealId = parseInt(req.params.mealId);
  return Meal.findByPk(mealId)
  .then(meal => {
    if (meal) {
      var mealName = meal.name;
      var foodId = parseInt(req.params.foodId);
      return Food.findByPk(foodId)
      .then((food) => {
        if (food) {
          var foodName = food.name;
          return MealFood.create({
            MealId: mealId,
            FoodId: foodId
          }).then((mealFood) => {
            message = {
              message: `Successfully added ${foodName} to ${mealName}`
            };
            res.status(201).send(JSON.stringify(message));
          })
        } else {
          let error = { error: `No food found with id ${foodId}` };
          res.status(404).send(JSON.stringify(error));
        }
      })
    } else {
      let error = { error: `No meal found with id ${mealId}` };
      res.status(404).send(JSON.stringify(error));
    }
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }));
  });
});

module.exports = router;
