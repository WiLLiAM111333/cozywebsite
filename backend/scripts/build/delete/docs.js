const { rm } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  try {
    await rm(join(__dirname, '..', '..', '..', 'docs'), { recursive: true });
  } catch (err) {
    throw err;
  }  
}
