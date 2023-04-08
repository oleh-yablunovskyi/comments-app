'use strict';

const { body } = require('express-validator');

const commentValidationRules = [
  body('userName').notEmpty().withMessage('User name is required'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('message').notEmpty().withMessage('Message is required'),
  body('homePage').if(body('homePage').notEmpty()).isURL().withMessage('Home page must be a valid URL'),
  body('parentId').custom(value => {
    if (value === null || /^\d+$/.test(value)) {
      return true;
    }
    throw new Error('Parent ID must be a numerical string or null');
  }),
];

module.exports = commentValidationRules;
