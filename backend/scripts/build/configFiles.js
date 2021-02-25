const { rm } = require('fs/promises');
const { join } = require('path');

module.exports.deleteConfigFiles = async () => {
  try {
    const rootPath = join(__dirname, '..', '..');
    
    await Promise.all([
      rm(join(rootPath, '.eslintrc')),
      rm(join(rootPath, 'jest.config.json')),
      rm(join(rootPath, 'tsconfig.json')),
      rm(rootPath, '..', '.editorconfig'),
      rm(rootPath, '..', '.gitignore'),
      rm(rootPath, '..', 'Contributing.md'),
      rm(rootPath, '..', 'LICENSE'),
      rm(rootPath, '..', 'README.md')
    ]);
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }
}
