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

if(platform() !== 'linux') {
  process.exit(0);
}

const { exec } = require('child_process');
const { join } = require('path');
const { setupSimulations, setupLogs } = require('./create');
const { deleteData, deleteDocs, deleteResources, deleteTests } = require('./delete');
const {
  unlinkSync,
  writeFileSync
} = require('fs');

const packageJSONPath = join(__dirname, '..', '..', 'package.json');
const packageJSON = require('../../package.json');

// Remove the devDependencies for the production environment
delete packageJSON.devDependencies;

(async () => {
  try {
    await deleteTests();

    console.log('Deleted tests');
    console.log('Removed dev dependencies');
    console.log('Installing production dependencies...');

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

      console.log('Compiling TypeScript down to JavaScript in ./dist')

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

        console.log('Removing unnecessary files and adding new ones we need...');
        
        (async () => {
          await Promise.all([
            removeResources(),
            deleteTests(),
            deleteData(),
            deleteConfigFiles(),
            removeAllDocs(),
            setupSimulations(),
            setUpLogDirectory()
          ]);
        })();
        
        console.log('Everything has been built and prepared for production, except for environment variables and the database (WIP)');
      })
    });
  } catch (err) {
    console.error(err);
  }
})();
