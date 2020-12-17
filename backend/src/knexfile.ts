import { Constants } from './utils/constants';
const { KNEX_USER, KNEX_PASSWORD } = Constants;

export = {
  development: {
    client: 'mysql',
    connection: {
      user: KNEX_USER,
      password: KNEX_PASSWORD
    }
  },
  test: {
    client: 'mysql',
    connection: {
      user: KNEX_USER,
      password: KNEX_PASSWORD
    }
  }
};
