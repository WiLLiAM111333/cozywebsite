import { IModMailConfig } from "lib/discord/modmail/config/IModMailConfig";
import { IOAuthEndpoints } from "../../lib/discord/oauth2/IOAuthEndpoints";

export namespace Constants {
  export enum TableNames {
    MODERATION_CONFIG = 'moderation_config',
    RATELIMITS = 'ratelimits',
    DISCORD_REPORTS = 'discord_reports',
    DISCORD_BANS = 'discord_bans',
    DISCORD_KICKS = 'discord_kicks',
    DISCORD_MUTES = 'discord_mutes',
    DISCORD_WARNS = 'discord_warns',
    DISCORD_GIF_BANS = 'discord_gif_bans',
    DISCORD_EMOTE_BANS = 'discord_emote_bans',
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
    LEVEL_REWARDS = 'level_rewards',
    MODMAIL_CONFIG = 'modmail_config',
    MODMAIL_INDIVIDUAL_CONFIG = 'modmail_individual_config',
    CARS = 'cars',
    STARBOARD = 'starboard',
    STARBOARD_CONFIG = 'starboard_config',
    ONE_WORD_STORIES = 'one_word_stories',
    COUNTING_CHANNEL_DATA = 'counting_channel_data'
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

  export const ANIMAL_API_ENDPOINTS = {
    FACTS: {
      BIRD: 'https://some-random-api.ml/facts/bird',
      CAT: 'https://some-random-api.ml/facts/cat',
      DOG: 'https://some-random-api.ml/facts/dog',
      FOX: 'https://some-random-api.ml/facts/fox',
      KOALA: 'https://some-random-api.ml/facts/koala',
      PANDA: 'https://some-random-api.ml/facts/panda'
    },
    IMAGE: {
      BIRD: 'https://some-random-api.ml/img/birb',
      CAT: 'https://some-random-api.ml/img/cat',
      DOG: 'https://some-random-api.ml/img/dog',
      FOX: 'https://some-random-api.ml/img/fox',
      KOALA: 'https://some-random-api.ml/img/koala',
      PANDA: 'https://some-random-api.ml/img/panda'
    }
  }

  export const OAuthEndpoints: IOAuthEndpoints = {
    authorize: 'https://discord.com/api/oauth2/authorize',
    token: 'https://discord.com/api/oauth2/token',
    token_revoke: 'https://discord.com/api/oauth2/token/revoke'
  }

  export const DEFAULT_MODMAIL_CFG: Optional<IModMailConfig> = {
    channel: false,
    smtp: false
  }
  
  export const DEFAULT_ZALGO_THRESHOLD = 0.55;
  export const TOKEN = process.env.TOKEN;
  export const CLIENT_ID = process.env.CLIENT_ID;
  export const CLIENT_SECRET = process.env.CLIENT_SECRET;
  export const PORT = process.env.PORT;
  export const KNEX_USER = process.env.KNEX_USER;
  export const KNEX_PASSWORD = process.env.KNEX_PASSWORD;
  export const KNEX_DB = process.env.KNEX_DB;
  export const KNEX_TEST_DB = process.env.KNEX_TEST_DB;
  export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  export const SMTP_HOST = process.env.SMTP_HOST;
  export const SMTP_PORT = parseInt(process.env.SMTP_PORT);
  export const SMTP_ENCRYPTION_METHOD = process.env.SMTP_ENCRYPTION_METHOD;
  export const SMTP_AUTH_USER = process.env.SMTP_AUTH_USER;
  export const SMTP_AUTH_PASSWORD = process.env.SMTP_AUTH_PASSWORD;
  export const SMTP_SECURE = process.env.SMTP_SECURE === 'true'; // Handles the string interpretation of false in the .env file

  export const API_MESSAGE = '❤️ The Cozy Hangout REST API ❤️';
}
