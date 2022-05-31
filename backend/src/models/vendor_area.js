'use strict';
module.exports = (sequelize, DataTypes) => {
  const vendor_area = sequelize.define('vendor_area', {
    vendorId: DataTypes.INTEGER,
    areaId: DataTypes.INTEGER
  }, {});
  vendor_area.associate = function(models) {
    // associations can be defined here
  };
  return vendor_area;
};