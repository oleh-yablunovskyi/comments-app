/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

const createUsersTable = require('./migrations/createUsersTable');
const createCommentsTable = require('./migrations/createCommentsTable');
const seedUsers = require('./seeders/seedUsers');
const seedComments = require('./seeders/seedComments');

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/comments', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;

(async() => {
  try {
    await createUsersTable();
    await seedUsers();

    await createCommentsTable();
    await seedComments();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error while creating tables:', error);
  }
})();
