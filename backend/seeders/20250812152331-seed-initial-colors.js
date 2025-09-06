"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Colors",
      [
        {
          id: 1,
          name: "Sky Blue",
          hex: "#87ceeb",
          rgb: "rgb(135, 206, 235)",
          hsl: "hsl(197, 71%, 73%)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Saddle Brown",
          hex: "#8b4513",
          rgb: "rgb(139, 69, 19)",
          hsl: "hsl(25, 76%, 31%)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Slate Gray",
          hex: "#708090",
          rgb: "rgb(112, 128, 144)",
          hsl: "hsl(210, 13%, 50%)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Jet Black",
          hex: "#000000",
          rgb: "rgb(0, 0, 0)",
          hsl: "hsl(0, 0%, 0%)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "Pure White",
          hex: "#ffffff",
          rgb: "rgb(255, 255, 255)",
          hsl: "hsl(0, 0%, 100%)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Colors",
      {
        id: { [Sequelize.Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
