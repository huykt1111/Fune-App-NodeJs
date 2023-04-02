'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Member.belongsTo(models.Room, { foreignKey: 'idRoom', targetKey: 'id', as: 'memberData' })
        }
    }
    Member.init({
        idRoom: DataTypes.STRING,
        idMember: DataTypes.STRING,
        follow: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Member',
    });
    return Member;
};