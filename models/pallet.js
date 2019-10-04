"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pallet = sequelize.define(
    "Pallet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Pallet.associate = function(models) {
    // associations can be defined here
  };
  return Pallet;
};
