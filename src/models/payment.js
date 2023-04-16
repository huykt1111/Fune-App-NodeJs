'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Payment.init({
        idUser: DataTypes.STRING,
        name: DataTypes.STRING,
        cartNumber: DataTypes.STRING,
        expires: DataTypes.STRING,
        cvv: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        billingAddress: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};