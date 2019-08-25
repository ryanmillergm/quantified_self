const Joi = require('@hapi/joi');
var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var foodSerializer = require('../../../util/serializers/food');

/*GET all foods*/
router.get("/", function (req, res, next) {
  return Food.findAll({ attributes: ['id', 'name', 'calories'] })
  .then(foods => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }));
  })
});

/*GET food by id */
router.get("/:id", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  Food.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'name', 'calories']
  })
  .then(food => {
    if (food != null) {
    res.status(200).send(JSON.stringify(food));
  } else {
    res.status(404).send({ error: "That food does not exist" })
  }
  })
  .catch(err => {
    res.status(404).send({ error: err })
  });
});

/*POST a food */
router.post("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const schema = {
    name: Joi.string().min(2).max(30).required(),
    calories: Joi.number().integer().required()
  };
  let food = req.body.food
  const result = Joi.validate(food, schema);
  if (result.error) {
    res.status(400).send({error: result.error.details[0].message});
    return;
  }

  Food.create({
          name: food.name,
          calories: food.calories
    })
    .then(food => {
      res.status(201).send(JSON.stringify(foodSerializer(food)));
    })
    .catch(err => {
      res.status(400).send({error: err});
   });
 })

/*DELETE a food given the id*/
router.delete("/:id", function (req, res, next) {
  return Food.findByPk(req.params.id)
  .then(food => {
    if (food) {
      return food.destroy()
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
});

/*UPDATE a food given the id*/
router.patch("/:id", function (req, res, next) {
  return Food.findByPk(req.params.id)
  .then(food => {
    if (food === null){
      res.status(400).send({ error: "That food does not exist" })
      return
    } else {
      return food.update({
        name: req.body.food.name,
        calories: req.body.food.calories
      },
      {
        returning: true
      })
      .then(response => {
        food = response["dataValues"]
        res.setHeader("Content-Type", "application/json")
        res.status(202).send(JSON.stringify(foodSerializer(food)))
      })
    }
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }))
  })
})

module.exports = router;
