'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Food', ['name'], {
      type: 'UNIQUE',
      name: 'foodUniqueName'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Food', 'foodUniqueName')
  }
};
