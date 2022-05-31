'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      custId: {
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      paymentmethod: {
        type: Sequelize.STRING
      },
      grandtotal: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('processing','shipping','delieverd','cancel'),
				defaultValue: 'processing'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};