"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Panel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1- one panel has one color at the time
      Panel.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "color", //alias,optional but might be usefull in certain cases
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });

      //2-one panel belongs to one wardrobe at a given time
      Panel.belongsTo(models.Wardrobe, {
        foreignKey: "wardrobe_id",
        as: "wardrobe",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      //3-one panel has one panel type aat a given time
      Panel.belongsTo(models.Wardrobe, {
        foreignKey: "panel_type_id",
        as: "panel type",
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
    }
  }
  Panel.init(
    {
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      depth: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      wardrobe_id: DataTypes.INTEGER,
      panel_type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Panel",
    }
  );
  return Panel;
};
