import { cyan, red } from 'chalk';
import { app } from './app';
import { Constants } from '../utils/constants';
import { client } from '../bot/index';

const { PORT, TOKEN } = Constants;

app.listen(PORT, () => {
  console.log(`[${red('SERVER')}] running on ${cyan(`http://localhost:${PORT}`)}`);
  client.login(TOKEN);
});
