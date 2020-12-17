import chalk from 'chalk';
import { app } from './app';
import { Constants } from '../utils/constants';
import { client } from '../bot/index';

const { PORT, TOKEN } = Constants;

app.listen(PORT, () => {
  console.log(chalk.cyan(`Server running on http://localhost:${PORT}`));
  client.login(TOKEN);
});
