"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wardrobe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here:
      // 1-A wardrobe belongs to one manufacturer
      Wardrobe.belongsTo(models.Manufacturer, {
        foreignKey: "manufacturer_id",
        as: "manufacturer", //alias,optional but might be usefull in certain cases
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });

      //2- A wardrobe can have more than one panel at the time
      Wardrobe.hasMany(models.Panel, {
        foreignKey: "wardrobe_id",
        as: "panels",
      });
    }
  }
  Wardrobe.init(
    {
      production_code: DataTypes.STRING,
      technician_name: DataTypes.STRING,
      manufacturer_id: DataTypes.INTEGER,
      client_name: DataTypes.STRING,
      client_address: DataTypes.TEXT,
      client_phone: DataTypes.STRING,
      client_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wardrobe",
    }
  );
  return Wardrobe;
};
