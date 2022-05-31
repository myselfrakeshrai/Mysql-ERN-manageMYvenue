'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOffer = sequelize.define('ProductOffer', {
    productId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    discount_per: DataTypes.STRING,
    discount_price: DataTypes.FLOAT,
    qty: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    net_price: DataTypes.FLOAT
  }, {});
  ProductOffer.associate = function(models) {
    // associations can be defined here
    models.ProductOffer.belongsTo(models.product, { foreignKey: 'productId' });

  };
  return ProductOffer;
};