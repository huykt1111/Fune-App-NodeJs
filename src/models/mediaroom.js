'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MediaRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MediaRoom.belongsTo(models.PostRoom, { foreignKey: 'id_post' });
        }
    }
    MediaRoom.init({
        id_post: DataTypes.STRING,
        media: DataTypes.STRING,
        type: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MediaRoom',
        tableName: 'mediarooms'
    });
    return MediaRoom;
};