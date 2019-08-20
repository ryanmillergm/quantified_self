var Food = require('../models').Food;
var shell = require('shelljs');

module.exports.before = async function(done) {
  shell.exec('npx sequelize db:drop');
  shell.exec('npx sequelize db:create');
  shell.exec('npx sequelize db:migrate');

  done();
}

module.exports.beforeEach = async function(done) {
  await Food.destroy({ where: {} })
  
  done();
}

// module.exports.after = function() {
//   shell.exec('npx sequelize db:drop');
// }