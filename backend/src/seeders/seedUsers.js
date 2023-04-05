'use strict';

const fs = require('fs');
const path = require('path');
const { User } = require('../models/associations');

const usersFilePath = path.join(__dirname, '..', 'mockup_data', 'users.json');
const usersData = fs.readFileSync(usersFilePath, 'utf-8');
const users = JSON.parse(usersData);

const seedUsers = async() => {
  await User.bulkCreate(users);
  console.log('User table has been populated with data from users.json.');
};

module.exports = seedUsers;
