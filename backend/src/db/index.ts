import knexConfig from './knexfile';
import { cyan, red } from 'chalk';
import Knex from 'knex';

const env = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[env];
let db: Knex;

(async () => {
  try {
    db = Knex(connectionConfig);
    const dbName = await (await db.raw('SELECT DATABASE()'))[0][0]['DATABASE()'];

    console.log(`[${red('DB')}] Connected to the database ${cyan(dbName)}`);
  } catch (err) {
    console.log(err, red('Failed to connect to MySQL'));
  }
})();

export { db };
