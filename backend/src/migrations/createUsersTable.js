'use strict';

const { User } = require('../models/associations');

const createUsersTable = async() => {
  await User.sync({ force: true });

  console.log('User table has been created.');
};

module.exports = createUsersTable;
