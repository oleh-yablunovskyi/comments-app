'use strict';

const { body } = require('express-validator');

const commentValidationRules = [
  body('userName').notEmpty().withMessage('User name is required'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('message').notEmpty().withMessage('Message is required'),
  body('homePage').if(body('homePage').notEmpty()).isURL().withMessage('Home page must be a valid URL'),
  body('parentId').optional({ nullable: true, checkFalsy: false }).isInt().withMessage('Parent ID must be an integer or null'),
];

module.exports = commentValidationRules;
