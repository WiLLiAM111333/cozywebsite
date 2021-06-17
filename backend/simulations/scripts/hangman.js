/*******************************************************
            THIS IS NOT A HANGMAN SOLVER,
            IT IS JUST A SIMULATION TO SEE 
            HOW LONG IT WOULD TAKE IT TO 
            SOLVE WORDS LETTER BY LETTER
*******************************************************/

const { createWriteStream, unlinkSync, writeFileSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { green, whiteBright, redBright } = require('chalk');

const resultsDir = join(__dirname, '..', 'results');
const logFilePath = join(resultsDir, 'hangman.log');

if((readdirSync(resultsDir)).includes('hangman.log')) {
  unlinkSync(logFilePath);
} else {
  writeFileSync(logFilePath, '');
}

const logFile = createWriteStream(logFilePath, { flags: 'a' });
const validCharacters = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase();

const wordArr = [
  'electricity',  
  'programming',
  'hello',
  'welcome',
  'bye',
  'circuit',
  'coding',       
  'keyboard',
  'mouse',
  'monitor',
  'cable',
  'component',
  'script',       
  'compile',
  'type',
  'write',
  'run',
  'walk',
  'climb',
  'crawl',
  'fly',
  'think',
  'talk',
  'speak',
  'Pneumonoultramicroscopicsilicovolcanoconiosis',
  'Hippopotomonstrosesquippedaliophobia',
  'Supercalifragilisticexpialidocious',
  'Pseudopseudohypoparathyroidism',
  'Floccinaucinihilipilification',
  'Antidisestablishmentarianism',
  'Honorificabilitudinitatibus',
  'Thyroparathyroidectomized',
  'Dichlorodifluoromethane',
  'Incomprehensibilities'
].map(word => word.toUpperCase()).sort(() => .5 - Math.random())

let arr = [];
let resultsArr = [];
let counter = 0;

for(let i = 0; i < wordArr.length; i++) {
  const word = wordArr[Math.floor(Math.random() * wordArr.length)];
  arr = '-'.repeat(word.length).split('');

  for(let k = 0; k < word.length; k++) {
    for(let o = 0; o < validCharacters.length; o++) {
      if(validCharacters[o] === word[k]) {
        arr[k] = validCharacters[o];
      }
      
      // Log before breaking out of loop to avoid incomplete words being skipped in the logs but not actually in the loop
      console.log(`${whiteBright('[')} ${(arr.map(value => value === '-' ? redBright(value) : green(value))).join(', ')} ${whiteBright(']')}\n`)
      logFile.write(`[ ${arr.join(', ')} ]\n`);

      if(arr.join('') === word) {
        resultsArr.push({ word, times: counter })
        counter = 0;

        break;
      }

      counter++;
    }
  }
}

console.log(resultsArr);
