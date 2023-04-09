'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CommentRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CommentRoom.belongsTo(models.User, { foreignKey: 'idUser' }),
                CommentRoom.belongsTo(models.PostRoom, { foreignKey: 'idPost', targetKey: 'id', as: 'userCommentData' })
        }
    }
    CommentRoom.init({
        idPost: DataTypes.STRING,
        idUser: DataTypes.STRING,
        comment: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'CommentRoom',
    });
    return CommentRoom;
};