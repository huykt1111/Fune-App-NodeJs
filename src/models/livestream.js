'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LiveStream extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    LiveStream.init({
        id_user: DataTypes.STRING,
        description: DataTypes.STRING,
        is_live_now: DataTypes.BOOLEAN,
        is_public: DataTypes.BOOLEAN,
        is_public_dangerous: DataTypes.BOOLEAN,
        media: DataTypes.STRING,
        media_type: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LiveStream',
    });
    return LiveStream;
};