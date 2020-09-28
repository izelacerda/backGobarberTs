"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('order_problems', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('order_problems', 'description', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};