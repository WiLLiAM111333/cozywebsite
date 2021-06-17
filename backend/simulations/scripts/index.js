require('dotenv').config();
console.clear();
const { exec } = require('child_process');
const { join } = require('path');
const { red, yellow } = require('chalk');
const { createWriteStream, writeFileSync, readdirSync } = require('fs');

const rawInput = process.argv[2]?.toLowerCase();
const simulation = rawInput.endsWith('.js')
  ? rawInput
  : `${rawInput}.js`

if(!simulation) {
  return console.error(red('Please provide a simulation to run'));
} else {
  const simulationDir = readdirSync(__dirname);
  const exists = simulationDir.includes(simulation);

  if(!exists) {
    let str = `${red('This simulation does not exist You can run one of the following simulations:')}\n`;
    
    for(const sim of simulationDir) {
      if(sim !== 'index.js') {
        str += `${yellow(sim.split('.')[0])}\n`;
      }
    }
    
    return console.error(str);
  }
  
  const dumpPath = join(__dirname, '..', 'dump.log');
  
  if(!(readdirSync(join(__dirname, '..'))).includes('dump.log')) {
    writeFileSync(dumpPath, '');
  } 
  
  const dumpFile = createWriteStream(dumpPath, { flags: 'a' });
  
  exec(`node ${join(__dirname, simulation)}`, (err, stdout, stderr) => {
    const date = new Date().toLocaleString();
    
    dumpFile.write(`[${date}] [SIMULATION]: ${simulation}:\n`);
  
    if(err) {
      dumpFile.write(JSON.stringify(err, null, 2) + '\n');
    }
  
    if(stdout) {
      if(!stdout.includes('Error: ER_NOT_SUPPORTED_AUTH_MODE')) {
        console.log(stdout);
      }
    }
  
    if(stderr) {
      dumpFile.write(JSON.stringify(stderr, null, 2) + '\n');
    }

    dumpFile.close();
  });
}
