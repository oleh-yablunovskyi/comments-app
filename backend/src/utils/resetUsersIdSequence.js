'use strict';

const sequelize = require('./db');
const { QueryTypes } = require('sequelize');

const resetUsersIdSequence = async() => {
  try {
    const query = `
      SELECT setval(
        'users_id_seq',
        (SELECT MAX(id) FROM users)
      )
    `;

    await sequelize.query(query, { type: QueryTypes.SELECT });

    console.log('User id sequence has been reset.');
  } catch (error) {
    console.error('Error while resetting User id sequence:', error);
  }
};

module.exports = resetUsersIdSequence;
