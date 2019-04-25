'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    UserId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER,
    userAnswer: DataTypes.STRING,
    countTrue: DataTypes.INTEGER
  }, {});
  Test.associate = function(models) {
    Test.belongsTo(Models.Question);
    Test.belongsTo(Models.User);
  };
  return Test;
};