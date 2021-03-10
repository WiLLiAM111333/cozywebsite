const { rmdir } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  try {
    await rmdir(join(__dirname, '..', '..', '..', 'data'), { recursive: true });
  } catch (err) {
    throw err;
  }
}
