'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seller extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Seller.init({
        idUser: DataTypes.STRING,
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        bankAccountName: DataTypes.STRING,
        bankAccountNumber: DataTypes.STRING,
        bankIdentifierCode: DataTypes.STRING,
        bankLocation: DataTypes.STRING,
        bankCurrency: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Seller',
    });
    return Seller;
};