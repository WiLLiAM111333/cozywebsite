const { rmdir } = require('fs/promises');
const { join } = require('path');

module.exports.removeResources = async () => {
  try {
    await rmdir(join(__dirname, '..', '..', 'resources'), { recursive: true });
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }
}