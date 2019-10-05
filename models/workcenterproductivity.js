"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkcenterProductivity = sequelize.define(
    "WorkcenterProductivity",
    {
      qtyProduced: DataTypes.INTEGER,
      loss: DataTypes.INTEGER,
      productUom: DataTypes.STRING,
      factor: DataTypes.INTEGER,
      isChecked: DataTypes.BOOLEAN,
      isChecked: DataTypes.BOOLEAN,
      accepted: DataTypes.BOOLEAN
    },
    {}
  );
  WorkcenterProductivity.associate = function(models) {
    WorkcenterProductivity.belongsTo(models.Production);
    WorkcenterProductivity.belongsTo(models.Workcenter);
    WorkcenterProductivity.belongsTo(models.Workorder);
    WorkcenterProductivity.belongsTo(models.Product);
    WorkcenterProductivity.belongsTo(models.Pallet);
    WorkcenterProductivity.belongsTo(models.User);
    WorkcenterProductivity.belongsTo(models.Contact);
  };
  return WorkcenterProductivity;
};
