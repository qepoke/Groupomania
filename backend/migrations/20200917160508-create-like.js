'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model:'Users',
            key: 'userId'
        }
      },
      msgId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Messages',
          key: 'msgId'
        }
      },
      commentId:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model:'Comments',
          key: 'commentId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};