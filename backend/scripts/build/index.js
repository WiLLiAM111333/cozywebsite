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
THIS WILL BE ENFORCED BY AN OS CHECK, IT WILL NOT WORK ON WINDOWS                                     |
+=====================================================================================================+  
*/
const { platform } = require('os');

if(platform() !== 'linux') {
  process.exit(0);
} 

const { join               } = require('path');
const { exec               } = require('child_process');
const { setupSimulations   } = require('./simulations');
const { deleteConfigFiles  } = require('./configFiles');
const { removeResources    } = require('./resources');
const { deleteData         } = require('./data');
const { removeAllDocs      } = require('./docs');
const { setUpLogDirectory  } = require('./logs');
const { deleteTests        } = require('./tests');
const {
  unlinkSync,
  writeFileSync
} = require('fs');

const packageJSONPath = join(__dirname, '..', '..', 'package.json');
const packageJSON = require('../../package.json');

// Remove the devDependencies for the production environment
delete packageJSON.devDependencies;

// Replace the current package.json with a new one that doesnt have its devDepdendencies
// Then install the dependencies so we dont install stuff we dont need

try {
  unlinkSync(packageJSONPath);
  writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));

  console.log('Removed dev dependencies')
  console.log('Installing production dependencies...');

  exec('npm install', (err, stdout, stderr) => {
    if(err) {
      return console.error(err);
    }
  
    if(stdout) {
      console.log(stdout);
    }
  
    if(stderr) {
      console.error(stderr);
    }
  
    (async () => {
      try {
        console.log('Compiling TypeScript down to JavaScript in ./dist')

        exec('tsc', (cErr, cSTDOut, cSTDErr) => {
          if(cErr) {
            return console.error('Failed to compile, aborting script!', cErr);
          }
        
          if(cSTDOut) {
            console.log(cSTDOut);
          }
        
          if(cSTDerr) {
            return console.error('Failed to compile, aborting script!', cSTDErr);
          }
        
          (async () => {
            console.log('Removing unnecessary files and adding new ones we need...');

            try {
              await Promise.all([
                removeResources(),
                deleteTests(),
                deleteData(),
                deleteConfigFiles(),
                removeAllDocs(),
                setupSimulations(),
                setUpLogDirectory()
              ]);
             
              console.log('Everything has been built and prepared for production, except for environment variables!');
  
              process.exit(0);
            } catch (error) {
              console.error('Failed to build project, aborting script!', error);
              process.exit(1);
            }
          })();
        }); 
      } catch (error) {
        console.error('Failed to compile project, aborting script!', error);
        process.exit(1);
      }
    })();
  });
} catch (err) {
  console.log('Failed to replace package.json, aborting script!', err)
  process.exit(1);
}
