'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.addColumn(
				'users',
				'role', {
					type: Sequelize.STRING,
				}
			)])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.removeColumn(
				'users',
				'role'
			)])
  }
};
