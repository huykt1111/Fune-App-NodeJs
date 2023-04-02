'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Room.hasMany(models.Member, { foreignKey: 'idRoom', as: 'memberData' })
        }
    }
    Room.init({
        idUser: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        background: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Room',
    });
    return Room;
};