'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubChildCategory = sequelize.define('SubChildCategory', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER
  }, {});
  SubChildCategory.associate = function(models) {
    // associations can be defined here
    models.SubChildCategory.belongsTo(models.category, { foreignKey: 'categoryId' });
    models.SubChildCategory.belongsTo(models.SubCategory, { foreignKey: 'subcategoryId' });
    models.SubChildCategory.hasMany(models.product, { foreignKey: 'childCategoryId' });

  };
  return SubChildCategory;
};