'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CommentPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CommentPost.belongsTo(models.User, { foreignKey: 'id_user' }),
                CommentPost.belongsTo(models.Post, { foreignKey: 'id_post', targetKey: 'id' })
        }
    }
    CommentPost.init({
        id_post: DataTypes.STRING,
        id_user: DataTypes.STRING,
        id_parent: DataTypes.STRING,
        comment: DataTypes.STRING,
        loves: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'CommentPost',
    });
    return CommentPost;
};