'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: {
      type : DataTypes.STRING,
      validate : {
        isUnique : function(input,cb){
          Question.findOne({
            where: {
              question : input
            },hooks: false
          },)
          .then((value)=>{
            if(value){
              cb(`words already submitted, please submit another`)
            }else{
              cb()
            }
          })
          .catch((err) =>{
            cb(err)
          })
        }
      } 
    },
    answer: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Test, {
    	foreignKey: 'QuestionId'
    });
  };
  return Question;
};