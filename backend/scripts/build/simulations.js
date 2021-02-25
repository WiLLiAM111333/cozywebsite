const { writeFile, mkdir } = require('fs/promises');
const { join } = require('path');

module.exports.setupSimulations = async () => {
  try {
    const basePath = join(__dirname, '..', '..', 'simulations');

    await mkdir(join(basePath, 'results'));
    await writeFile(join(basePath, 'dumpfile.log'));
  } catch (err) {
    // Throws it up the chain to the other catch block in `index.js`
    throw err;
  }
}
