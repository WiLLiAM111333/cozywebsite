/*
======================================================================================================+
MIT License                                                                                           |
                                                                                                      |
Copyright (c) 2021 WiLLiAM111333                                                                      |
                                                                                                      |
Permission is hereby granted, free of charge, to any person obtaining a copy                          |
of this software and associated documentation files (the "Software"), to deal                         |
in the Software without restriction, including without limitation the rights                          |
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell                             |
copies of the Software, and to permit persons to whom the Software is                                 |
furnished to do so, subject to the following conditions:                                              |
                                                                                                      |
The above copyright notice and this permission notice shall be included in all                        |
copies or substantial portions of the Software.                                                       |
                                                                                                      |
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR                            |
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,                              |
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE                           |
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                                |
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,                         |
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE                         |
SOFTWARE.                                                                                             |
                                                                                                      |
END OF LICENSE                                                                                        |
                                                                                                      |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
DO NOT USE ANY OF THESE IN THE DEVELOPMENT BUILD AS IT WILL PERMANENTLY DELETE WHOLE FOLDERS.         |
THIS WILL BE ENFORCED BY AN OS CHECK AND WILL NOT WORK ON WINDOWS                                     |
+=====================================================================================================+  
*/

const { platform } = require('os');
const chalk = require('chalk');
const { cyan, greenBright } = chalk;

if(platform() !== 'linux') {
  process.exit(0);
}

const { exec } = require('child_process');
const { join } = require('path');
const { setupSimulations } = require('./create');
const { rmdir } = require('fs/promises');
const {
  unlinkSync,
  writeFileSync
} = require('fs');

const { 
  deleteData, 
  deleteDocs, 
  deleteResources, 
  deleteTests, 
  deleteConfigFiles,
  deleteTypeScript
} = require('./delete');

const packageJSONPath = join(__dirname, '..', '..', 'package.json');
const packageJSON = require('../../package.json');

// Remove the devDependencies for the production environment
delete packageJSON.devDependencies;

unlinkSync(packageJSONPath);
writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));

(async () => {
  try {
    await deleteTests();
    
    console.log(cyan('Deleted tests'));
    console.log(chalk`{cyan Removed} {greenBright dev dependencies}`);
    console.log(chalk`{cyan Installing {greenBright production dependencies}...}`);

    exec('npm install', (err, npmout, npmerr) => {
      if(err) {
        console.error(err);
      }

      if(npmerr) {
        console.error(npmerr);
      }

      if(npmout) {
        console.log(npmout);
      }

      console.log(chalk`{cyan Compiling {blueBright TypeScript} down to {yellowBright JavaScript} in {greenBright ./dist}}`);

      exec('tsc', (compileErr, tscout, tscerr) => {
        if(compileErr) {
          console.error(compileErr);
        }

        if(tscerr) {
          console.error(tscerr);
        }

        if(tscout) {
          console.log(tscout);
        }

        console.log(cyan('Removing unnecessary files and adding new ones we need...'));
        
        (async () => {
          await Promise.all([
            deleteResources(),
            deleteTests(),
            deleteData(),
            deleteDocs(),
            deleteTypeScript(),
            deleteConfigFiles(),
            setupSimulations()
          ]);

          await rmdir(join(__dirname, '..', '..', 'typings'), { recursive: true });
        })();
        
        console.log(greenBright('Everything has been built and prepared for production, except for the database (WIP)'));
        console.log(chalk`{cyan You need to {bold manually} provide environment variables in a {yellowBright .env} file!}`);
      });
    });
  } catch (err) {
    console.error(err);
  }
})();
