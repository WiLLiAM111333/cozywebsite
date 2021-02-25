const { rm } = require('fs/promises');
const { join } = require('path');

module.exports.deleteConfigFiles = async () => {
  try {
    const rootPath = join(__dirname, '..', '..');
    
    await Promise.all([
      rm(join(rootPath, '.eslintrc')),
      rm(join(rootPath, 'jest.config.json')),
      rm(join(rootPath, 'tsconfig.json')),
      rm(join(rootPath, '..', '.editorconfig')),
      rm(join(rootPath, '..', '.gitignore')),
      rm(join(rootPath, '..', 'Contributing.md')),
      rm(join(rootPath, '..', 'LICENSE')),
      rm(join(rootPath, '..', 'README.md'))
    ]);
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }
}
