'use strict';

const fs = require('fs');
const path = require('path');
const { Comment } = require('../models/associations');

const commentsFilePath = path.join(__dirname, '..', 'mockup_data', 'comments.json');
const commentsData = fs.readFileSync(commentsFilePath, 'utf-8');
const comments = JSON.parse(commentsData);

const seedComments = async() => {
  await Comment.bulkCreate(comments);
  console.log('Comment table has been populated with data from comments.json.');
};

module.exports = seedComments;
