'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Quentin',
      email: 'quentin@test.fr',
      password: '$2b$10$DMNKwd.sHJnXvVrZglTPreMtRSJgblyJ20TNfhcCtD2KFkCEEjY2O',
      avatar: 'http://localhost:3000/images/avatar-default.png',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};