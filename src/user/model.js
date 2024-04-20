// models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  memberid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_code: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  files: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_attached: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: false });
})();
module.exports = User;
