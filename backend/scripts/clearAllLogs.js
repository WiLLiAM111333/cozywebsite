const { rmdir, mkdir, writeFile } = require('fs/promises');
const { join } = require('path');
const chalk = require('chalk');
const logFiles = require('../config/logFiles.json');

(async () => {
  const path = join(__dirname, '..', 'logs');
  await rmdir(path, { recursive: true });
  await mkdir(path);
  await mkdir(join(path, 'discord'));
  await mkdir(join(path, 'rest'));

  for(const file of logFiles.discord) {
    await writeFile(join(path, 'discord', `${file}.log`), '');
  }

  for(const dir in logFiles.rest) {
    for(const file of logFiles.rest[dir]) {
      await writeFile(join(path, 'rest', `${file}.log`), '');
    }
  }

  console.log(chalk.yellow(`Emptied all logs in ${path}`));
})();
