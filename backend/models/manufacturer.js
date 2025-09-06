"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // A manufacturer can have many wardrobes
      Manufacturer.hasMany(models.Wardrobe, {
        foreignKey: "manufacturer_id",
        as: "wardrobes", //alias,optional but might be usefull in certain cases
      });
    }
  }
  Manufacturer.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Manufacturer",
    }
  );
  return Manufacturer;
};
