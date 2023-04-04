'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db.js');
const User = require('./user');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parent_comment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  image_link: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  text_file_link: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: false,
});

module.exports = Comment;
