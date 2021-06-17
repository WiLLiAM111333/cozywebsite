const { Coinflip } = require('../../dist/lib/games/coinflip')
const { createWriteStream, unlinkSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');

const coinFlip = new Coinflip();

const resultsDir = join(__dirname, '..', 'results');
const logFilePath = join(resultsDir, 'coinflip.log');

if((readdirSync(resultsDir)).includes('coinflip.log')) {
  unlinkSync(logFilePath);
} else {
  writeFileSync(logFilePath, '');
}

const logFile = createWriteStream(logFilePath, { flags: 'a' });
const results = [];

for(let i = 0; i < 200; i++) {
  let games = 0;
  let wins = 0;
  let losses = 0;
  let xp = 0;

  for(let o = 1; o > 0; o++) {
    const random = Math.floor(Math.random() * 2);

    if(random) {
      xp += 95;
      wins++;
    } else {
      xp -= 45;
      losses++
    }

    logFile.write(`[${games} ${random ? 'WIN' : 'LOSS'}]: ${xp}\n`);

    if(xp >= 36000) {
      results.push({
        xp,
        games,
        wins,
        losses,
        winrate: coinFlip.getWinRatio({ wins, losses })
      });

      break;
    } else {
      games++
    }
  }
}

logFile.write(JSON.stringify(results, null, 2) + '\n');
