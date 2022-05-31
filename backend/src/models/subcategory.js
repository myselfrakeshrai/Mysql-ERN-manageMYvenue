'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    sub_name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    
  }, {});
  SubCategory.associate = function(models) {
    // associations can be defined here
    models.SubCategory.belongsTo(models.category, { foreignKey: 'categoryId' });
    models.SubCategory.hasMany(models.SubChildCategory, { foreignKey: 'subcategoryId' });
    models.SubCategory.hasMany(models.product, { foreignKey: 'subCategoryId' });

  };
  return SubCategory;
};