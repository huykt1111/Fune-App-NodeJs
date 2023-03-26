'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'description', { type: Sequelize.STRING });
        await queryInterface.addColumn('Users', 'background', { type: Sequelize.STRING });
        await queryInterface.addColumn('Users', 'image_type', { type: Sequelize.STRING });
        await queryInterface.addColumn('Users', 'background_type', { type: Sequelize.STRING });
        await queryInterface.addColumn('Users', 'note', { type: Sequelize.STRING });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Users', 'description', { type: Sequelize.STRING });
        await queryInterface.removeColumn('Users', 'background', { type: Sequelize.STRING });
        await queryInterface.removeColumn('Users', 'image_type', { type: Sequelize.STRING });
        await queryInterface.removeColumn('Users', 'background_type', { type: Sequelize.STRING });
        await queryInterface.removeColumn('Users', 'note', { type: Sequelize.STRING });
    }
};

