'use strict';

const multer = require('multer');
const path = require('path');

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

const getDestination = (_req, file, cb) => {
  const baseDir = path.join(__dirname, '..', 'uploads');
  let targetDir;

  switch (file.fieldname) {
    case 'imageFile':
      targetDir = path.join(baseDir, 'images');
      break;

    case 'textFile':
      targetDir = path.join(baseDir, 'text');
      break;

    default:
      return cb(new Error('Invalid field name'));
  }

  cb(null, targetDir);
};

const storage = multer.diskStorage({
  destination: getDestination,
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
