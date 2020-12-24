import { IOAuthEndpoints } from "../../lib/discord/oauth2/IOAuthEndpoints";

export namespace Constants {
  export enum TableNames {
    RATELIMITS = 'ratelimits',
    DISCORD_REPORTS = 'discord_reports',
    DISCORD_BANS = 'discord_bans',
    DISCORD_KICKS = 'discord_kicks',
    DISCORD_MUTES = 'discord_mutes',
    DISCORD_WARNS = 'discord_warns',
    WEBSITE_BANS = 'website_bans',
    SHARED_MOD_LOG = 'shared_mod_log',
    USERS = 'users',
    COMMANDS = 'commands',
    COMMAND_CONFIGS = 'command_configs',
    AUTOMOD_CONFIG = 'automod_config',
    AUTOMOD_IGNORED_ROLES = 'automod_ignored_roles',
    AUTOMOD_IGNORED_CHANNELS = 'automod_ignored_channels',
    AUTOMOD_BLACKLISTED_LINKS = 'automod_blacklisted_links',
    AUTOMOD_PROFANITIES = 'automod_profanities'
  }

  export enum EmbedColors {
    RED = '#ff0000',
    GREEN = '#00d111'
  }

  export const OAuthEndpoints: IOAuthEndpoints = {
    authorize: 'https://discord.com/api/oauth2/authorize',
    token: 'https://discord.com/api/oauth2/token',
    token_revoke: 'https://discord.com/api/oauth2/token/revoke'
  }
  
  export const OAUTH_REDIRECT = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
  export const DEFAULT_ZALGO_THRESHOLD = 0.55;
  export const TOKEN = process.env.TOKEN;
  export const CLIENT_ID = process.env.CLIENT_ID;
  export const CLIENT_SECRET = process.env.CLIENT_SECRET;
  export const PORT = process.env.PORT;
  export const KNEX_USER = process.env.KNEX_USER;
  export const KNEX_PASSWORD = process.env.KNEX_PASSWORD;
  export const KNEX_DB = process.env.KNEX_DB;
  export const KNEX_TEST_DB = process.env.KNEX_TEST_DB;
  export const API_MESSAGE = '❤️ The Cozy Hangout REST API ❤️';
}
