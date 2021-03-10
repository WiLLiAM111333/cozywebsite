const { readdir, unlink, rmdir } = require('fs/promises');
const { join } = require('path');

module.exports = async () => {
  const root = join(__dirname, '..', '..', '..', '..');
  const backend = join(root, 'backend');

  try { 
    await Promise.all([
      unlink(join(root, 'Contributing.md')),
      unlink(join(root, 'README.md')),
      unlink(join(root, 'LICENSE')),
      unlink(join(root, '.editorconfig')),
      unlink(join(root, '.gitignore')),
      rmdir(join(root, '.git'), { recursive: true}),
      rmdir(join(root, '.github'), { recursive: true })
    ]);

    const backendDir = await readdir(backend);

    for(const file of backendDir) {
      if(file[0] === '.') {
        await unlink(join(backend, file));
      }
    }

    await Promise.all([
      unlink(join(backend, 'jest.config.json')),
      unlink(join(backend, 'tsconfig.json'))
    ]);
  } catch (err) {
    throw err;
  }
}
