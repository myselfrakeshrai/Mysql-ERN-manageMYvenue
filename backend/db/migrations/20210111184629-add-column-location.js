'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return Promise.all([
      queryInterface.addColumn(
        'locations',
        'zipcode', {
          type: Sequelize.INTEGER,
        }
      )])
  },

  down: (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.removeColumn(
        'locations',
        'zipcode'
      )])
  }
};
