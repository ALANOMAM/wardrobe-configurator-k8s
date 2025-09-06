"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PanelType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // on panel type can be had by different panel id's in general
      PanelType.hasMany(models.Panel, {
        foreignKey: "panel_type_id",
        as: "panels",
      });
    }
  }
  PanelType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PanelType",
    }
  );
  return PanelType;
};
