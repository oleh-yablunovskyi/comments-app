'use strict';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const baseDir = path.join(__dirname, '..', 'uploads');

    if (file.fieldname === 'imageFile') {
      cb(null, path.join(baseDir, 'images'));
    } else if (file.fieldname === 'textFile') {
      cb(null, path.join(baseDir, 'text'));
    } else {
      cb(new Error('Invalid field name'));
    }
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
