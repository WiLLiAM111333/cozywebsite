import knex from 'knex';
import knexConfig from '../knexfile';

const env = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[env];

const db = knex(connectionConfig);

export { db };
