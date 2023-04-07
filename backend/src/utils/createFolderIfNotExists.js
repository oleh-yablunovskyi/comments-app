'use strict';

const fs = require('fs');

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

module.exports = createFolderIfNotExists;
