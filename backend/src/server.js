/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { User, Comment } = require('./models/associations');
const createUsersTable = require('./migrations/createUsersTable');
const createCommentsTable = require('./migrations/createCommentsTable');
const seedUsers = require('./seeders/seedUsers');
const seedComments = require('./seeders/seedComments');

const app = express();
const upload = multer();

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

// Create newComment endpoint
app.post('/comments', upload.none(), async(req, res) => {
  const {
    userName,
    email,
    homePage,
    parentId,
    message,
  } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({
      where: { email },
    });

    // Create new user if user doesn't exist
    if (!user) {
      user = await User.create({
        user_name: userName,
        email,
        home_page: homePage,
      });
    }

    // Create a new comment with the provided data
    const newComment = await Comment.create({
      user_id: user.id,
      text: message,
      parent_comment_id: Number(parentId) || null,
      image_link: null,
      text_file_link: null,
    });

    // Fetch the newly created comment with the author
    const createdComment = await Comment.findOne({
      where: { id: newComment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'user_name', 'email', 'home_page'],
          as: 'author',
        },
      ],
    });

    if (!createdComment) {
      return res.status(500).send('Error creating comment');
    }

    res.send(createdComment);
  } catch (err) {
    console.error('Error creating comment:', err);
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
