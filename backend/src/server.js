/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const { User, Comment } = require('./models/associations');

const createUsersTable = require('./migrations/createUsersTable');
const createCommentsTable = require('./migrations/createCommentsTable');
const seedUsers = require('./seeders/seedUsers');
const seedComments = require('./seeders/seedComments');

const app = express();

app.use(cors());
app.use(express.json());

// Get topComments endpoint
app.get('/comments', async(req, res) => {
  const sortBy = req.query.sortBy || 'created_at';
  const sortOrder = req.query.sortOrder || 'asc';
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.pageSize) || 25;

  try {
    // Fetch top-level comments and add authors to them
    const topLevelComments = await Comment.findAll({
      where: {
        parent_comment_id: null,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'user_name', 'email', 'home_page'],
          as: 'author',
        },
      ],
      order: [[sortBy, sortOrder]],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    res.send(topLevelComments);
  } catch (error) {
    console.error('Error fetching top-level comments:', error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

// Get childrenComments endpoint
app.get('/comments/:id/children', async(req, res) => {
  const parentId = Number(req.params.id);

  try {
    // Fetch child-comments and add authors to them
    const childComments = await Comment.findAll({
      where: {
        parent_comment_id: parentId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'user_name', 'email', 'home_page'],
          as: 'author',
        },
      ],
      order: [
        ['created_at', 'ASC'],
      ],
    });

    if (!childComments || childComments.length === 0) {
      return res.send([]);
    }

    res.send(childComments);
  } catch (err) {
    console.error('Error fetching child comments:', err);
    res.status(500).send('Internal server error');
  }
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
