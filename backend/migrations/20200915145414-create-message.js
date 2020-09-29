'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      msgId: {
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
      content:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(1)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(1)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};