var express = require("express");
var router = express.Router();
var Meal = require("../../../models").Meal;
var MealFood = require("../../../models").MealFood;
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
  var mealName;
  var foodName;
  return Meal.findByPk(mealId)
  .then(meal => {
    if (meal) {
      mealName = meal.name;
      var foodId = parseInt(req.params.foodId);
      return Food.findByPk(foodId)
      .then((food) => {
        if (food) {
          foodName = food.name;
          return MealFood.create({
            MealId: mealId,
            FoodId: foodId
          }).then((mealFood) => {
            message = {
              message: `Successfully added ${foodName} to ${mealName}`
            };
            res.status(201).send(JSON.stringify(message));
          });
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
    if (err.name == 'SequelizeUniqueConstraintError') {
      let error = { error: `There is already ${foodName} in ${mealName}` };
      res.status(422).send(JSON.stringify(error));
    } else {
      res.status(500).send(JSON.stringify({ error: err }));
    }
  });
});

/*DELETES a food from meal*/
router.delete("/:id/foods/:food_id", function(req, res, next) {
  return MealFood.findOne({
    where: {
      MealId: req.params.id,
      FoodId: req.params.food_id
    }
  })
  .then(mealFood => {
    if (mealFood) {
      return mealFood.destroy()
      .then(() => {
        res.status(204).send();
      })
    } else {
      res.status(404).send();
    }
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }));
  })
})

module.exports = router;
