var Food = require('../models').Food;
var shell = require('shelljs');

before(function() {
  console.log("global before hook starting...")
  this.timeout(20000);
  console.log("dropping database...")
  shell.exec('npx sequelize db:drop');
  console.log("creating database...")
  shell.exec('npx sequelize db:create');
  console.log("migrating database...")
  shell.exec('npx sequelize db:migrate');
});

beforeEach(async function() {
  console.log("global beforeEach hook starting...")
  this.timeout(20000);
  console.log("destroying all foods...")
  await Food.destroy({ where: {} })
});

// after(function() {
  //   console.log("global after hook starting...")
  // this.timeout(20000);
//   console.log("dropping database...")
//   shell.exec('npx sequelize db:drop');
// });
