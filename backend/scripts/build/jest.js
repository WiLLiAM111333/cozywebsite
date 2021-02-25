const { rm } = require('fs/promises');
const { join } = require('path');

module.exports.removeJest = async () => {
  try {
    await rm(join(__dirname, '..', '..', 'jest'), { recursive: true });
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err; 
  }
}
