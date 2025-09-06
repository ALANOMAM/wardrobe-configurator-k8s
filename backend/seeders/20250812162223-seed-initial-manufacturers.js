"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Manufacturers",
      [
        {
          name: "Acme Corp",
          address: "123 Industrial Way, Springfield, IL, USA",
          phone: "+1 (555) 123-4567",
          email: "contact@acmecorp.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Global Tech Industries",
          address: "456 Tech Park Avenue, San Jose, CA, USA",
          phone: "+1 (408) 987-6543",
          email: "info@globaltech.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Green Solutions Ltd.",
          address: "789 Eco Drive, Vancouver, BC, Canada",
          phone: "+1 (604) 321-9876",
          email: "support@greensolutions.ca",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Manufacturers", null, {});
  },
};
