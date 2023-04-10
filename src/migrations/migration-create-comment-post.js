'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CommentPosts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_user: {
                type: Sequelize.INTEGER
            },
            id_post: {
                type: Sequelize.INTEGER
            },
            comment: {
                type: Sequelize.STRING
            },
            id_parent: {
                type: Sequelize.INTEGER
            }
            status: {
                type: Sequelize.BOOLEAN
            },
            loves: {
                type: Sequelize.INTEGER
            }
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
        await queryInterface.dropTable('CommentPosts');
    }
};

