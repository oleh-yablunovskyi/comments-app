'use strict';

const multer = require('multer');
// const path = require('path');

const allowedImageMimeTypes = ['image/jpeg', 'image/gif', 'image/png'];
const maxTextFileSize = 100 * 1024; // 100 KB

const fileFilter = (_req, file, cb) => {
  let errorMessage = '';

  switch (file.fieldname) {
    case 'imageFile':
      if (!allowedImageMimeTypes.includes(file.mimetype)) {
        errorMessage = 'Invalid image file format. Allowed formats: JPG, GIF, PNG';
      }
      break;

    case 'textFile':
      if (file.mimetype !== 'text/plain') {
        errorMessage = 'Invalid text file format. Only TXT format is allowed';
      } else if (file.size > maxTextFileSize) {
        errorMessage = 'Text file size exceeds the limit of 100 KB';
      }
      break;

    default:
      errorMessage = 'Invalid field name';
  }

  if (errorMessage) {
    cb(new Error(errorMessage));
  } else {
    cb(null, true);
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5 MB file size limit

module.exports = upload;
