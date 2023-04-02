'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Media.belongsTo(models.Post, { foreignKey: 'id_post' });
    }
  }
  Media.init({
    id_post: DataTypes.STRING,
    media: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'medias'
  });
  return Media;
};