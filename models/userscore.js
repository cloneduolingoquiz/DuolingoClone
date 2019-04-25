'use strict';
module.exports = (sequelize, DataTypes) => {
  const userScore = sequelize.define('userScore', {
    UserId: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {});
  userScore.associate = function(models) {
    // associations can be defined here
  };
  return userScore;
};