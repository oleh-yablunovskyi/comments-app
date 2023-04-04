'use strict';

const User = require('./user');
const Comment = require('./comment');

User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

module.exports = {
  User,
  Comment,
};
