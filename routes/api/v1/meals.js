// const Joi = require("@hapi/joi");
var express = require("express");
var router = express.Router();
var Meal = require("../../../models").Meal;
var MealFood = require("../../../models").MealFood;
var Food = require("../../../models").Food;

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

// router.delete("/api/v1/meals/:meal_id/foods/:id", function(req, res, next) {
//   return Meal.findByPk(req.params.meal_id)
// }).then(meal => {
//   console.log(meal)
// }))

router.delete("/:id/foods/:food_id", function(req, res, next) {

  return MealFood.findOne({
    where: {
      MealId: req.params.id,
      FoodId: req.params.food_id
    }
  })
  .then(mealFood => {
    // console.log("-=-=-=-=-=-=-=-=-")
    // console.log(mealFood["dataValues"])
    if (mealFood) {
      return mealFood.destroy()
      .then(() => {
        res.status(204).send();
      })
    } else {
      res.status(404).send()
    }
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }));
  })
})

module.exports = router;
