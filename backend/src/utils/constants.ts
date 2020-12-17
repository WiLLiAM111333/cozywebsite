export namespace Constants {
  export enum TableNames {
    RATELIMITS = 'ratelimits',
    DISCORD_REPORTS = 'discord_reports',
    DISCORD_BANS = 'discord_bans',
    DISCORD_KICKS = 'discord_kicks',
    DISCORD_MUTES = 'discord_mutes',
    DISCORD_WARNS = 'discord_xwarns',
    WEBSITE_BANS = 'website_bans',
    SHARED_MOD_LOG = 'shared_mod_log',
    USERS = 'users'
  }

  export const TOKEN = process.env.TOKEN;
  export const PORT = process.env.PORT;
  export const KNEX_USER = process.env.KNEX_USER;
  export const KNEX_PASSWORD = process.env.KNEX_PASSWORD;
  export const KNEX_DB = process.env.KNEX_DB;
  export const KNEX_TEST_DB = process.env.KNEX_TEST_DB;

  export const API_MESSAGE = '❤️ The Cozy Hangout REST API ❤️';

  export const AUTH_REGISTER_REGEXES = {
    disallowed: {
      username: [/^(\s+)$/],
      password: [/^(\s+)$/]
    },
    required: {
      email: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/],
      username: [],
      password: []
    }
  }
}