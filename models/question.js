'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.hasMany(Models.Test, {
    	foreignKey = 'QuestionId'
    });
  };
  return Question;
};