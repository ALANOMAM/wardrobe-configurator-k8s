"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Panels", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      depth: {
        type: Sequelize.INTEGER,
      },
      color_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Colors",
          key: "id",
        },
        onUpdate: "CASCADE", // If the color ID were updated (rare), propagate the change
        onDelete: "RESTRICT", // This will restrict the delete of a color id in the Colors table that is in use here
      },
      wardrobe_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Wardrobes",
          key: "id",
        },
        onUpdate: "CASCADE", //If the wardrobe ID were updated (rare), propagate the change
        onDelete: "CASCADE", //On the delete of a wardrobe row, the row in panel table containing it's id will be deleted too
      },
      panel_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "PanelTypes",
          key: "id",
        },
        onUpdate: "CASCADE", //If the panel type ID were updated (rare), propagate the change
        onDelete: "RESTRICT", // This will restrict the delete of a panel type id in the Colors table that is in use here
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
    await queryInterface.dropTable("Panels");
  },
};
