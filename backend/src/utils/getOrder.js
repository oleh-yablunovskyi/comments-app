'use strict';

const User = require('../models/user');

const getOrder = (sortBy, sortOrder) => {
  if (sortBy === 'user_name' || sortBy === 'email') {
    return [{ model: User, as: 'author' }, sortBy, sortOrder];
  } else {
    return [sortBy, sortOrder];
  }
};

module.exports = {
  getOrder,
};
