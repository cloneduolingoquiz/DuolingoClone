'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [{
        UserId: 1,
        QuestionId: 1,
        userAnswer: null,
        countTrue: null,
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tests', null, {});
  }
};
