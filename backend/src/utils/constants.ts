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
    COMMAND_CONFIGS = 'command_configs',
    AUTOMOD_CONFIG = 'automod_config',
    AUTOMOD_IGNORED_ROLES = 'automod_ignored_roles',
    AUTOMOD_IGNORED_CHANNELS = 'automod_ignored_channels',
    AUTOMOD_BLACKLISTED_LINKS = 'automod_blacklisted_links',
    AUTOMOD_PROFANITIES = 'automod_profanities',
    AUTOMOD_ACTION_ZALGO = 'automod_action_zalgo',
    AUTOMOD_ACTION_PROFANITY = 'automod_action_profanity',
    AUTOMOD_ACTION_EXTERNAL_LINK = 'automod_action_external_link',
    AUTOMOD_ACTION_REPEATED_TEXT = 'automod_action_repeated_text',
    AUTOMOD_ACTION_CAPS_SPAM = 'automod_action_caps_spam',
    AUTOMOD_ACTION_EMOTE_SPAM = 'automod_action_emote_spam',
    AUTOMOD_ACTION_SPOILER_SPAM = 'automod_action_spoiler_spam',
    AUTOMOD_ACTION_MASS_PINGS = 'automod_action_mass_pings',
    AUTOMOD_ACTION_BLACKLISTED_LINK = 'automod_action_blacklisted_link',
    AUTOMOD_ACTION_HOIST_USERNAME = 'automod_action_hoist_username',
    AUTOMOD_ACTION_HOIST_NICKNAME = 'automod_action_hoist_nickname',
    AUTOMOD_ACTION_ZALGO_USERNAME = 'automod_action_zalgo_username',
    AUTOMOD_ACTION_ZALGO_NICKNAME = 'automod_action_zalgo_nickname',
    DISCORD_PROFILES = 'discord_profiles',
    LEVEL_REWARDS = 'level_rewards'
  }

  export enum EmbedColors {
    RED = '#ff0000',
    GREEN = '#00d111'
  }

  export const HEX_VALUES = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15
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
