import { IModMailConfig } from "lib/discord/modmail/config/IModMailConfig";
import { IOAuthEndpoints } from "../../lib/discord/oauth2/IOAuthEndpoints";

export namespace Constants {
  export enum TableNames {
    MODERATION_CONFIG               = 'moderation_config',
    RATELIMITS                      = 'ratelimits',
    DISCORD_REPORTS                 = 'discord_reports',
    DISCORD_BANS                    = 'discord_bans',
    DISCORD_KICKS                   = 'discord_kicks',
    DISCORD_MUTES                   = 'discord_mutes',
    DISCORD_WARNS                   = 'discord_warns',
    DISCORD_GIF_BANS                = 'discord_gif_bans',
    DISCORD_EMOTE_BANS              = 'discord_emote_bans',
    SHARED_MOD_LOG                  = 'shared_mod_log',
    USERS                           = 'users',
    COMMAND_CONFIGS                 = 'command_configs',
    AUTOMOD_CONFIG                  = 'automod_config',
    AUTOMOD_IGNORED_ROLES           = 'automod_ignored_roles',
    AUTOMOD_IGNORED_CHANNELS        = 'automod_ignored_channels',
    AUTOMOD_BLACKLISTED_LINKS       = 'automod_blacklisted_links',
    AUTOMOD_PROFANITIES             = 'automod_profanities',
    AUTOMOD_ZALGO_CONFIG            = 'automod_zalgo_config',
    AUTOMOD_PROFANITY_CONFIG        = 'automod_profanity_config',
    AUTOMOD_EXTERNAL_LINK_CONFIG    = 'automod_external_link_config',
    AUTOMOD_REPEATED_TEXT_CONFIG    = 'automod_repeated_text_config',
    AUTOMOD_CAPS_SPAM_CONFIG        = 'automod_caps_spam_config',
    AUTOMOD_EMOTE_SPAM_CONFIG       = 'automod_emote_spam_config',
    AUTOMOD_SPOILER_SPAM_CONFIG     = 'automod_spoiler_spam_config',
    AUTOMOD_MASS_PINGS_CONFIG       = 'automod_mass_pings_config',
    AUTOMOD_BLACKLISTED_LINK_CONFIG = 'automod_blacklisted_link_config',
    AUTOMOD_HOIST_USERNAME_CONFIG   = 'automod_hoist_username_config',
    AUTOMOD_HOIST_NICKNAME_CONFIG   = 'automod_hoist_nickname_config',
    AUTOMOD_ZALGO_USERNAME_CONFIG   = 'automod_zalgo_username_config',
    AUTOMOD_ZALGO_NICKNAME_CONFIG   = 'automod_zalgo_nickname_config',
    DISCORD_PROFILES                = 'discord_profiles',
    LEVEL_REWARDS                   = 'level_rewards',
    MODMAIL_CONFIG                  = 'modmail_config',
    MODMAIL_INDIVIDUAL_CONFIG       = 'modmail_individual_config',
    STARBOARD                       = 'starboard',
    STARBOARD_CONFIG                = 'starboard_config',
    ONE_WORD_STORIES                = 'one_word_stories'
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
      BIRD:  'https://some-random-api.ml/facts/bird',
      CAT:   'https://some-random-api.ml/facts/cat',
      DOG:   'https://some-random-api.ml/facts/dog',
      FOX:   'https://some-random-api.ml/facts/fox',
      KOALA: 'https://some-random-api.ml/facts/koala',
      PANDA: 'https://some-random-api.ml/facts/panda'
    },
    IMAGE: {
      BIRD:  'https://some-random-api.ml/img/birb',
      CAT:   'https://some-random-api.ml/img/cat',
      DOG:   'https://some-random-api.ml/img/dog',
      FOX:   'https://some-random-api.ml/img/fox',
      KOALA: 'https://some-random-api.ml/img/koala',
      PANDA: 'https://some-random-api.ml/img/panda'
    }
  }

  export const OAuthEndpoints: IOAuthEndpoints = {
    authorize:    'https://discord.com/api/oauth2/authorize',
    token:        'https://discord.com/api/oauth2/token',
    token_revoke: 'https://discord.com/api/oauth2/token/revoke'
  }

  export const DEFAULT_MODMAIL_CFG: Optional<IModMailConfig> = {
    channel: false
  }

  export const {
    TOKEN,
    CLIENT_ID,
    CLIENT_SECRET,
    PORT,
    KNEX_USER,
    KNEX_PASSWORD,
    KNEX_DB,
    KNEXT_TEST_DB
  } = process.env

  export const DEFAULT_ZALGO_THRESHOLD = 0.55;
  export const API_MESSAGE = '❤️ The Cozy Hangout REST API ❤️';
}
