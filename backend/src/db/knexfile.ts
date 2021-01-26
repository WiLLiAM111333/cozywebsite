import { Constants } from '../utils/constants';
const { KNEX_USER, KNEX_PASSWORD, KNEX_DB, KNEX_TEST_DB } = Constants;

export = {
  development: {
    client: 'mysql',
    connection: {
      user: KNEX_USER,
      password: KNEX_PASSWORD,
      database: KNEX_DB
    }
  },
  test: {
    client: 'mysql',
    connection: {
      user: KNEX_USER,
      password: KNEX_PASSWORD,
      database: KNEX_TEST_DB
    }
  }
};
