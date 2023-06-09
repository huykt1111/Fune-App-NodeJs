'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            PostRoom.hasMany(models.CommentRoom, { foreignKey: 'idPost', as: 'userCommentData' })
            this.belongsTo(models.User, { foreignKey: 'id_user', targetKey: 'id' });
            this.hasMany(models.MediaRoom, { foreignKey: 'id_post', as: 'medias' });
        }
    }
    PostRoom.init({
        id_user: DataTypes.STRING,
        description: DataTypes.STRING,
        idRoom: DataTypes.STRING,
        is_public: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'PostRoom',
    });
    return PostRoom;
};