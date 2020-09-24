'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message, { foreignKey: 'msgId', allowNull: false });
      models.User.hasMany(models.Like, { foreignKey: 'likeId', allowNull: false });
      models.User.hasMany(models.Comment, { foreignKey: 'commentId', allowNull: false });
    }
  };
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    bio: DataTypes.TEXT,
    avatar: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};