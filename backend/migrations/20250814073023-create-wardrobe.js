"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wardrobes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      production_code: {
        type: Sequelize.STRING,
      },
      technician_name: {
        type: Sequelize.STRING,
      },
      manufacturer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Manufacturers",
          key: "id",
        },
        onUpdate: "CASCADE", // If the manufacturer ID were updated (rare), propagate the change
        onDelete: "RESTRICT", //This will restrict the delete of a manufacturers id in the manu's table if used here
      },

      client_name: {
        type: Sequelize.STRING,
      },
      client_address: {
        type: Sequelize.TEXT,
      },
      client_phone: {
        type: Sequelize.STRING(20),
      },
      client_email: {
        type: Sequelize.STRING(254),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wardrobes");
  },
};
