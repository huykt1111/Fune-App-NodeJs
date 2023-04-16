'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderUser.belongsTo(models.Product, { foreignKey: 'idProduct', targetKey: 'id', as: 'orderData' })
        }
    }
    OrderUser.init({
        idUser: DataTypes.STRING,
        idProduct: DataTypes.STRING,
        quantity: DataTypes.STRING,
        total: DataTypes.STRING,
        address: DataTypes.STRING,
        payment: DataTypes.STRING,
        statusId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OrderUser',
    });
    return OrderUser;
};