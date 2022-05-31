'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userid: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
    models.customer.hasMany(models.Address, { foreignKey: 'custId' });  
    models.customer.hasMany(models.payment, { foreignKey: 'custId' });  

  };
  return customer;
};