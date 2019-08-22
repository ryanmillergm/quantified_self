const Joi = require('@hapi/joi');
var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;

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

/*GET one specific food */
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
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send({error: result.error.details[0].message});
    return;
  }

  Food.create({
          name: req.body.name,
          calories: req.body.calories
    })
    .then(food => {
      res.status(201).send(JSON.stringify(food));
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
  return Food.update({
    name: req.body.name,
    calories: req.body.calories
  },
  {
    returning: true,
    where: {
      id: parseInt(req.params.id)
    }
  })
  .then(food => {
    res.setHeader("Content-Type", "application/json")
    res.status(202).send(JSON.stringify(food))
  })
  .catch(err => {
    res.status(400).send(JSON.stringify({ error: err }))
  })
})

module.exports = router;
