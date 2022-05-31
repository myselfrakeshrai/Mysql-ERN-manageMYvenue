'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.addColumn(
				'Addresses',
				'custId', {
					type: Sequelize.INTEGER,
				}
			)])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.removeColumn(
				'Addresses',
				'custId'
			)])
  }
};
