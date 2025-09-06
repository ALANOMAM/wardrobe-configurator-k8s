"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //1-one can be had by many panels
      Color.hasMany(models.Panel, {
        foreignKey: "color_id",
        as: "panels",
      });
    }
  }
  Color.init(
    {
      name: DataTypes.STRING,
      hex: DataTypes.STRING,
      rgb: DataTypes.STRING,
      hsl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Color",
    }
  );
  return Color;
};
