const { rmdir } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  const basePath = join(__dirname, '..', '..', '..');

  await Promise.all([
    rmdir(join(basePath, 'src'), { recursive: true }),
    rmdir(join(basePath, 'lib'), { recursive: true }),
    rmdir(join(basePath, 'typings'), { recursive: true }),
  ]);
} 
