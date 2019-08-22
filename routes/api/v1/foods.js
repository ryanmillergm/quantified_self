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
  console.log(req.body)
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
