'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    custId: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    method: DataTypes.STRING,
    currency: DataTypes.STRING,
    orderCreationId: DataTypes.STRING,
    razorpayPaymentId: DataTypes.STRING,
    razorpayOrderId: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
    models.payment.belongsTo(models.customer, { foreignKey: 'custId' });  

  };
  return payment;
};