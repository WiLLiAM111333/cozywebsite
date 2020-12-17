const { readdir, rmdir, mkdir } = require('fs/promises');
const { join } = require('path');
const chalk = require('chalk');

(async () => {
  const basePath = join(__dirname, '..', 'jest');
  const directories = await readdir(basePath);

  for(const dir of directories) {
    await rmdir(join(basePath, dir), { recursive: true });
    await mkdir(join(basePath, dir));
    
    console.log(chalk.yellow(`Emptied the ${dir} directory in ${basePath}`));
  }
  
  const hasFiles = (directories.includes(('cache' && 'coverage')));
  
  if(!hasFiles) {
    await mkdir(join(basePath, 'cache'));
    console.log(chalk.yellow(`Emptied the cache directory in ${basePath}`));

    await mkdir(join(basePath, 'coverage'));
    console.log(chalk.yellow(`Empted the coverage directory in ${basePath}`));
  }
})();
