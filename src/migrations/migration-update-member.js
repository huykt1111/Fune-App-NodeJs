'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Members', 'heart', { type: Sequelize.STRING });
        await queryInterface.addColumn('Members', 'roleId', { type: Sequelize.STRING });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Members', 'heart', { type: Sequelize.STRING });
        await queryInterface.removeColumn('Members', 'roleId', { type: Sequelize.STRING });
    }
};

