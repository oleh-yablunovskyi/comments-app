'use strict';

const path = require('path');
const fs = require('fs/promises');

const saveTextFile = async(req, res, next) => {
  if (!req.files.textFile) {
    return next();
  }

  try {
    const textBuffer = req.files.textFile[0].buffer;
    const newFilename = `${Date.now()}-${req.files.textFile[0].originalname}`;
    const outputFilePath = path.join(__dirname, '..', 'uploads', 'text', newFilename);

    await fs.writeFile(outputFilePath, textBuffer);

    req.files.textFile[0].filename = newFilename;
  } catch (error) {
    console.error('Error saving text file:', error);

    return res.status(500).send('Internal server error');
  }

  next();
};

module.exports = saveTextFile;
