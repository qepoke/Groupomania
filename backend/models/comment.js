'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      models.Comment.belongsTo(models.Message, { foreignKey: 'msgId', onDelete: 'CASCADE' });
    }
  };
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    msgId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};