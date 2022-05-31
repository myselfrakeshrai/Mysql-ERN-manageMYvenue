'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.addColumn(
				'categories',
				'slug', {
					type: Sequelize.STRING,
				}
			)])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.removeColumn(
				'categories',
				'slug'
			)])
  }
};
