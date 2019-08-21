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
  Food.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'name', 'calories']
  })
  .then(food => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});

module.exports = router;
