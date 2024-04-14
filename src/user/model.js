// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const User = sequelize.define('Users', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  memberid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_code: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  file_attached: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  image_attached:{
    type: String
  }



});

(
  async()=>{
    await sequelize.sync({froce:true})
  }
)();
module.exports = User;
