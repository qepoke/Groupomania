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
      models.User.belongsTo(models.Message, {foreignKey: "msgId", onDelete: 'CASCADE', allowNull: false });
      models.User.belongsTo(models.Message, {foreignKey: "userId", onDelete: 'CASCADE', allowNull: false});
    }
  };
  Like.init({
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    msgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};