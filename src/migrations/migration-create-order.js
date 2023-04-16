'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idUser: {
                type: Sequelize.STRING
            },
            idProduct: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.STRING
            },
            total: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            payment: {
                type: Sequelize.STRING
            },
            statusId: {
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
        await queryInterface.dropTable('OrderUsers');
    }
};

