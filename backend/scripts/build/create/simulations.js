const { writeFile, mkdir } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  const basePath = join(__dirname, '..', '..', '..', 'simulations');

  try {
    await mkdir(join(basePath, 'results'));
    await writeFile(join(basePath, 'dumpfile.log'), '');
  } catch (err) {
    throw err;
  }
}
