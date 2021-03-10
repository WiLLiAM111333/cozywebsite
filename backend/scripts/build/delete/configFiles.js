const { readdir, unlink, rmdir, lstat } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  const root = join(__dirname, '..', '..', '..', '..');
  const backend = join(root, 'backend');

  try {
    const rootDir = await readdir(root);

    for(const file of rootDir) {
      if(file[0] === '.') {
        await unlink(join(root, file));
      }
    }

    await Promise.all([
      unlink(join(root, 'Contributing.md')),
      unlink(join(root, 'REAMDE.md')),
      unlink(join(root, 'LICENSE'))
    ]);

    
    const backendDir = await readdir(backend);

    for(const file of backendDir) {
      if(file[0] === '.') {
        const filePath = join(backend, file);
        if((await lstat(file)).isDirectory()) {
          await rmdir(filePath, { recursive: true });
        } else {
          await unlink(filePath);
        }
      }
    }

    await Promise.all([
      unlink(join(backend, 'jest.config.json')),
      unlink(join(backend, 'tsconfig.json'))
    ])
  } catch (err) {
    throw err;
  }
}
