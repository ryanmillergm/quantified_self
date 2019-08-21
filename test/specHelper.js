var Food = require('../models').Food;
var shell = require('shelljs');

module.exports.before = function() {
  shell.exec('npx sequelize db:drop');
  shell.exec('npx sequelize db:create');
  shell.exec('npx sequelize db:migrate');
}

module.exports.beforeEach = async function() {
  await Food.destroy({ where: {} })
}

module.exports.after = function() {
  shell.exec('npx sequelize db:drop');
}
