'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return Promise.all([
      queryInterface.addColumn(
        'areas',
        'zipcode', {
          type: Sequelize.INTEGER,
        }
      )])
  },

  down: (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.removeColumn(
        'areas',
        'zipcode'
      )])
  }
};
