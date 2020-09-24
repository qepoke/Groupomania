'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', allowNull: false });
      models.Message.hasMany(models.Like, { foreignKey: 'likeId', allowNull: false });
      models.Message.hasMany(models.Comment, { foreignKey: 'commentId', allowNull: false });
    };
  };
  Message.init({
    msgId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    content: DataTypes.TEXT,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};