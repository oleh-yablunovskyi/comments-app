'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');
const resizeAndSaveImage = require('../middlewares/resizeAndSaveImage');
const saveTextFile = require('../middlewares/saveTextFile');
const commentValidationRules = require('../validations/commentValidationRules');
const commentsController = require('../controllers/commentsController');

module.exports = (io) => {
  router.get('/', commentsController.getTopComments);
  router.get('/:id/children', commentsController.getChildrenComments);

  router.post(
    '/',
    upload.fields([{ name: 'imageFile' }, { name: 'textFile' }]),
    resizeAndSaveImage,
    saveTextFile,
    commentValidationRules,
    commentsController.createNewComment(io)
  );

  return router;
};
