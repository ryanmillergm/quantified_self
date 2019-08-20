var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;

/*GET all foods*/
router.get("/", function (req, res, next) {
  return Food.findAll()
  .then(foods => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(err => {
    res.status(500).send(JSON.stringify({ error: err }));
  })
});

module.exports = router;
