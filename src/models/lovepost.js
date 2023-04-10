'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LovePost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            LovePost.belongsTo(models.User, { foreignKey: 'id_user' }),
                LovePost.belongsTo(models.Post, { foreignKey: 'id_post', targetKey: 'id' })
        }
    }
    LovePost.init({
        id_post: DataTypes.STRING,
        id_user: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LovePost',
    });
    return LovePost;
};