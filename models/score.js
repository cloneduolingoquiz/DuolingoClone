'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    UserId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  Score.associate = function(models) {
    // associations can be defined here
    Score.belongsTo(models.User,{
      foreignKey : 'UserId'
    })
  };
  return Score;
};