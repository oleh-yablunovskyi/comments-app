'use strict';

const sharp = require('sharp');
const path = require('path');

const resizeAndSaveImage = async(req, res, next) => {
  if (!req.files.imageFile) {
    return next();
  }

  try {
    const imageBuffer = req.files.imageFile[0].buffer;
    const newFilename = `${Date.now()}-${req.files.imageFile[0].originalname}`;
    const outputFilePath = path.join(__dirname, '..', 'uploads', 'images', newFilename);

    await sharp(imageBuffer)
      .resize(320, 240, { fit: 'inside', withoutEnlargement: true })
      .toFile(outputFilePath);

    req.files.imageFile[0].filename = newFilename;
  } catch (error) {
    console.error('Error resizing image:', error);

    return res.status(500).send('Internal server error');
  }

  next();
};

module.exports = resizeAndSaveImage;
