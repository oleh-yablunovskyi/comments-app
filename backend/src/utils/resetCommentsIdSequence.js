'use strict';

const sequelize = require('./db');
const { QueryTypes } = require('sequelize');

const resetCommentsIdSequence = async() => {
  try {
    const query = `
      SELECT setval(
        'comments_id_seq',
        (SELECT MAX(id) FROM comments)
      )
    `;

    await sequelize.query(query, { type: QueryTypes.SELECT });

    console.log('Comment id sequence has been reset.');
  } catch (error) {
    console.error('Error while resetting Comment id sequence:', error);
  }
};

module.exports = resetCommentsIdSequence;
