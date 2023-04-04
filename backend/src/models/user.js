'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db.js');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  home_page: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
