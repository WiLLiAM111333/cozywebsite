const { rmdir, mkdir, writeFile } = require('fs/promises');
const { join } = require('path');
const chalk = require('chalk');
const { rest } = require('../config/logFiles.json');

(async () => {
  const path = join(__dirname, '..', 'logs', 'rest');
  await rmdir(path, { recursive: true });
  await mkdir(path);

  for(const dir in rest) {
    for(const file of rest[dir]) {
      await writeFile(join(path, `${file}.log`), '');
    }
  }

  console.log(chalk.yellow(`Emptied all discord logs in ${path}`))
})();
