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
});

module.exports = sequelize;
