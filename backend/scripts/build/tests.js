const { rmdir } = require('fs/promises');
const { join } = require('path');

module.exports.deleteTests = async () => {
  try {
    await rmdir(join(__dirname, '..', '..', 'test'), { recursive: true });
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }
}
