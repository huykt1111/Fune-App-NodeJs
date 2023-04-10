'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Cart, { foreignKey: 'idProduct', as: 'cartData' })
      this.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  Product.init({
    id_user: DataTypes.STRING,
    id_category: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    media: DataTypes.STRING,
    media_type: DataTypes.STRING,
    is_public: DataTypes.BOOLEAN,
    currency: DataTypes.STRING,
    pricing: DataTypes.STRING,
    stock: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};