'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cart.belongsTo(models.Product, { foreignKey: 'idProduct', targetKey: 'id', as: 'cartData' })
            this.belongsTo(models.User, { foreignKey: 'idUser' });
        }
    }
    Cart.init({
        idProduct: DataTypes.STRING,
        idUser: DataTypes.STRING,
        quantity: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};