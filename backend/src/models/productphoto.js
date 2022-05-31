'use strict';
module.exports = (sequelize, DataTypes) => {
  const productphoto = sequelize.define('productphoto', {
    productId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {});
  productphoto.associate = function(models) {
    // associations can be defined here
    models.productphoto.belongsTo(models.product, { foreignKey: 'productId' });

  };
  return productphoto;
};