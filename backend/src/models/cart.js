'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    models.Cart.belongsTo(models.Address, { foreignKey: 'addressId' });  
    models.Cart.belongsTo(models.Order, { foreignKey: 'orderId' });
  };
  return Cart;
};