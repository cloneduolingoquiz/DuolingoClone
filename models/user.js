'use strict';
const crypto = require('crypto')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true, msg: `not a valid email`
        },
        isUnique : function(input,cb){
          User.findOne({
            where: {
              email : input
            },hooks: false
          },)
          .then((value)=>{
            if(value){
              cb(`email sudah digunakan, silahkan gunakan email lain`)
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
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : function(user){
        const secret = 'qwerty'
        const hash = crypto.createHmac('sha256',secret)
                                      .update(user.password)
                                      .digest('hex')

        user.password = hash
      },
      beforeFind : function(input){
        // console.log(input.where.password,'-----------');
        const secret = 'qwerty'
        const hash = crypto.createHmac('sha256',secret)
                                      .update(input.where.password)
                                      .digest('hex')
        input.where.password = hash
      }

    }
  });
  User.associate = function(models) {
    User.belongsTo(models.Test);
  };
  return User;
};

// var bcrypt = require('bcrypt');
