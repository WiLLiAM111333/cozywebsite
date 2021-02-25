const { rm } = require('fs/promises');
const { join } = require('path');

module.exports.removeAllDocs = async () => {
  try {
    await rm(join(__dirname, '..', '..', 'docs'), { recursive: true });
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }  
}
