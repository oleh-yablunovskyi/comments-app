/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from the environment variables');
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  // logging: (msg) => {
  //   console.log('\n--- Executing SQL Query ---\n');
  //   console.log(msg);
  //   console.log('\n--- End of SQL Query ---\n');
  // },
});

module.exports = sequelize;
