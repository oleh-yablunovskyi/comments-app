'use strict';

const createUsersTable = require('./migrations/createUsersTable');
const createCommentsTable = require('./migrations/createCommentsTable');
const seedUsers = require('./seeders/seedUsers');
const seedComments = require('./seeders/seedComments');
const resetUsersIdSequence = require('./utils/resetUsersIdSequence');
const resetCommentsIdSequence = require('./utils/resetCommentsIdSequence');

const setupDatabase = async() => {
  try {
    // Create tables and seed data
    await createUsersTable();
    await seedUsers();
    await resetUsersIdSequence();
    await createCommentsTable();
    await seedComments();
    await resetCommentsIdSequence();

    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Error during database setup:', error);
  }
};

module.exports = setupDatabase;
