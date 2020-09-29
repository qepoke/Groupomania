'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, { foreignKey: "userId", onDelete: 'CASCADE'});
      models.Like.belongsTo(models.Message, { foreignKey: 'msgId', onDelete: 'CASCADE'});
    }
  };
  Like.init({
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    msgId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};