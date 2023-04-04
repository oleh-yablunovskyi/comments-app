'use strict';

const { Comment } = require('../models/associations');

const createCommentsTable = async() => {
  await Comment.sync({ force: true });

  console.log('Comment table has been created.');
};

module.exports = createCommentsTable;
