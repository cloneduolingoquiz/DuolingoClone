'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};