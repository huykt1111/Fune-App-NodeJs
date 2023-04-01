'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Sellers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idUser: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            bankAccountName: {
                type: Sequelize.STRING
            },
            bankAccountNumber: {
                type: Sequelize.STRING
            },
            bankIdentifierCode: {
                type: Sequelize.STRING
            },
            bankLocation: {
                type: Sequelize.STRING
            },
            bankCurrency: {
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
        await queryInterface.dropTable('Sellers');
    }
};

