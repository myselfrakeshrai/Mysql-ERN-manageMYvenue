'use strict';
module.exports = (sequelize, DataTypes) => {
  const vendor_product = sequelize.define('vendor_product', {
    supplierId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unitSize: DataTypes.INTEGER
     
  }, {});
  vendor_product.associate = function(models) {
    // associations can be defined here
    models.vendor_product.belongsTo(models.product, { foreignKey: 'productId' });
    models.vendor_product.belongsTo(models.vendor, { foreignKey: 'supplierId' });  

  };
  return vendor_product;
};