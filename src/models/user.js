'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Member, { foreignKey: 'idMember' })
      User.hasOne(models.CommentRoom, { foreignKey: 'idUser' })
      this.hasMany(models.Post, { foreignKey: 'id_user', as: 'posts' });
      this.hasMany(models.Cart, { foreignKey: 'idUser', as: 'carts' });
      this.hasMany(models.Product, { foreignKey: 'id_user', as: 'products' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    description: DataTypes.STRING,
    background: DataTypes.STRING,
    image_type: DataTypes.STRING,
    background_type: DataTypes.STRING,
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};