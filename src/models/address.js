'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Address.belongsTo(models.User, { foreignKey: 'id', targetKey: 'address', as: 'addressData' })
        }
    }
    Address.init({
        idUser: DataTypes.STRING,
        address: DataTypes.STRING,
        district: DataTypes.STRING,
        province: DataTypes.STRING,
        country: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};