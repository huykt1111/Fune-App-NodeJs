'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('LiveStreams', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_user: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
            },
            is_live_now: {
                type: Sequelize.BOOLEAN
            },
            is_public: {
                type: Sequelize.BOOLEAN
            },
            is_public_dangerous: {
                type: Sequelize.BOOLEAN
            },
            media: {
                type: Sequelize.STRING
            },
            media_type: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('LiveStreams');
    }
};

