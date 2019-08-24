'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MealFoods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MealId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Meals',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      FoodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Food',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      let sql = `CREATE UNIQUE INDEX "MealFoodCompoundIndex"
              ON "MealFoods"
              USING btree
              ("MealId", "FoodId");
            `;
      return queryInterface.sequelize.query(sql, { raw: true });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MealFoods');
  }
};