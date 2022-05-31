'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.addColumn(
				'Orders',
				'deliverydate', {
					type: Sequelize.DATE,
				}
			)])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
			queryInterface.removeColumn(
				'Orders',
				'deliverydate'
			)])
  }
};
