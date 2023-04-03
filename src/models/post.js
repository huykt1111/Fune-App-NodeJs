'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id_user', targetKey: 'id' });
      this.hasMany(models.Media, { foreignKey: 'id_post', as: 'medias' });

    }
  }
  Post.init({
    id_user: DataTypes.STRING,
    description: DataTypes.STRING,
    is_public: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};