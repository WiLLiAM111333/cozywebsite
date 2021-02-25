const { mkdir } = require('fs/promises');
const { join } = require('path');

module.exports.setUpLogDirectory = async () => {
  try {
    const basePath = join(__dirname, '..', '..', 'logs');
    const discordPath = join(basePath, 'discord');
    const restPath = join(basePath, 'rest');

    await Promise.all([
      mkdir(basePath),
      mkdir(discordPath),
      mkdir(restPath)
    ]);
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }  
}
