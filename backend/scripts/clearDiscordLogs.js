const { rmdir, mkdir, writeFile } = require('fs/promises');
const { join } = require('path');
const chalk = require('chalk');
const { discord } = require('../config/logFiles.json');

(async () => {
  const path = join(__dirname, '..', 'logs', 'discord');
  await rmdir(path, { recursive: true });
  await mkdir(path);

  for(const file of discord) {
    await writeFile(join(path, `${file}.log`), '');
  }
  
  console.log(chalk.yellow(`Emptied all discord logs in ${path}`));
})();
