'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    UserId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER,
    userAnswer: DataTypes.STRING,
    countTrue: DataTypes.INTEGER
  }, {});
  Test.associate = function(models) {
    Test.belongsTo(models.Question,{
      foreignKey: 'QuestionId'
    });
    Test.belongsTo(models.User,{
      foreignKey: 'UserId'
    });
  };
  return Test;
};