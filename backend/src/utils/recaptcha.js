'use strict';

const axios = require('axios');

async function verifyRecaptcha(response) {
  const secretKey = process.env.RECAPTCHA_SECRETKEY;

  try {
    const result = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`);

    return result.data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);

    return false;
  }
}

module.exports = verifyRecaptcha;
