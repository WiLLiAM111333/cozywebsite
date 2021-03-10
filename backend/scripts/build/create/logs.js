const { mkdir } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  const basePath = join(__dirname, '..', '..', '..', 'logs');
  const discordPath = join(basePath, 'discord');
  const restPath = join(basePath, 'rest');
  
  try {
    await Promise.all([
      mkdir(basePath),
      mkdir(discordPath),
      mkdir(restPath)
    ]);
  } catch (err) {
    throw err;
  }
}
