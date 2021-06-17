require('dotenv').config();

const Database = require('../dist/src/db/index');
/**
 * Temporary for development so I can get type casting and autocomplete
 * @type {import('knex')}
 */
const { db } = Database;
const { Constants } = require('../dist/src/utils/constants');
const { cyan } = require('chalk');

const { KNEX_DB, TableNames } = Constants;

const {
  MODERATION_CONFIG,
  AUTOMOD_ACTION_BLACKLISTED_LINK,
  AUTOMOD_ACTION_CAPS_SPAM,
  AUTOMOD_ACTION_EMOTE_SPAM,
  AUTOMOD_ACTION_EXTERNAL_LINK,
  AUTOMOD_ACTION_MASS_PINGS,
  AUTOMOD_ACTION_PROFANITY,
  AUTOMOD_ACTION_REPEATED_TEXT,
  AUTOMOD_ACTION_SPOILER_SPAM,
  AUTOMOD_ACTION_ZALGO,
  AUTOMOD_ACTION_HOIST_USERNAME,
  AUTOMOD_ACTION_HOIST_NICKNAME,
  AUTOMOD_ACTION_ZALGO_USERNAME,
  AUTOMOD_ACTION_ZALGO_NICKNAME,
  AUTOMOD_BLACKLISTED_LINKS,
  AUTOMOD_CONFIG,
  AUTOMOD_IGNORED_CHANNELS,
  AUTOMOD_IGNORED_ROLES,
  AUTOMOD_PROFANITIES,
  DISCORD_BANS,
  DISCORD_KICKS,
  DISCORD_MUTES,
  DISCORD_REPORTS,
  DISCORD_WARNS,
  DISCORD_GIF_BANS,
  DISCORD_EMOTE_BANS,
  USERS,
  DISCORD_PROFILES,
  LEVEL_REWARDS,
  MODMAIL_CONFIG,
  MODMAIL_INDIVIDUAL_CONFIG,
  CARS,
  STARBOARD,
  STARBOARD_CONFIG,
  ONE_WORD_STORIES,
  COUNTING_CHANNEL_DATA
} = TableNames;

(async () => {
  try {
    await db.raw(`USE ${KNEX_DB}`);

    /**
     * @param {String} name 
     * @param {(table: import('knex').CreateTableBuilder) => void} table 
     */
    const createTable = async (name, table) => {
      try {
        if(!(await db.schema.hasTable(name))) {
          await db.schema.createTable(name, table)

          console.log(cyan(`Created the table: ${name}`));
        }
      } catch (err) {
        console.error(err);
      }
    }

    await Promise.all([
      createTable(ONE_WORD_STORIES, table => {
        table.string('userID').notNullable().primary();
        table.integer('amount').notNullable().defaultTo(0);
        table.string('lastWord').notNullable().defaultTo(0);
      }),
      createTable(COUNTING_CHANNEL_DATA, table => {
        table.string('userID').notNullable().primary();
        table.integer('amount').notNullable().primary();
      }),
      createTable(MODERATION_CONFIG, table => {
        table.string('guildID').notNullable();
        table.string('staffRole').notNullable();
        table.string('mutedRole').notNullable();
        table.string('emoteBanRole');
        table.string('gifBanRole');
      }),
      createTable(DISCORD_BANS, table => {
        table.string('userID').notNullable();
        table.string('guildID').notNullable();
        table.string('banID').notNullable();
        table.text('reason').notNullable();
        table.boolean('unbanned').notNullable();
        table.string('bannedAt').notNullable();
      }),
      createTable(DISCORD_KICKS, table => {
        table.string('userID').notNullable();
        table.string('guildID').notNullable();
        table.string('kickID').notNullable();
        table.text('reason').notNullable();
        table.string('kickedAt').notNullable();
      }),
      createTable(DISCORD_MUTES, table => {
        table.string('guildID').notNullable();
        table.string('userID').notNullable();
        table.string('muteID').notNullable();
        table.text('reason').notNullable();
        table.string('mutedAt').notNullable();
      }),
      createTable(DISCORD_REPORTS, table => {
        table.string('userID').notNullable();
        table.string('reporterUserID').notNullable();
        table.string('reportID').notNullable();
        table.string('guildID').notNullable();
        table.text('reason').notNullable();
        table.string('reportedAt').notNullable();
      }),
      createTable(DISCORD_WARNS, table => {
        table.string('userID').notNullable();
        table.string('guildID').notNullable();
        table.string('warnID').notNullable();
        table.text('reason').notNullable();
        table.string('warnedAt').notNullable();
      }),
      createTable(DISCORD_GIF_BANS, table => {
        table.string('userID').notNullable();
        table.string('guildID').notNullable();
        table.string('gifBanID').notNullable();
        table.string('reason').notNullable();
        table.string('gifBannedAt').notNullable();
      }),
      createTable(DISCORD_EMOTE_BANS, table => {
        table.string('userID').notNullable();
        table.string('guildID').notNullable();
        table.string('emoteBanID').notNullable();
        table.string('reason').notNullable();
        table.string('gifBannedAt').notNullable();
      }),
      createTable(USERS, table => {
        // Keep working on this
        table.string('userID').notNullable(); 
        table.date('createdAt').notNullable();
      }),
      createTable(AUTOMOD_CONFIG, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('useProfanityFilter').notNullable().defaultTo(0);
        table.boolean('useZalgoFilter').notNullable().defaultTo(0);
        table.boolean('useCapsSpamFilter').notNullable().defaultTo(0);
        table.boolean('useLinkFilter').notNullable().defaultTo(0);
        table.boolean('useSpoilerSpamFilter').notNullable().defaultTo(0);
        table.boolean('useMassPingFilter').notNullable().defaultTo(0);
        table.boolean('useEmoteSpamFilter').notNullable().defaultTo(0);
        table.boolean('useBlacklistedLinkFilter').notNullable().defaultTo(0);
        table.boolean('useInviteLinkFilter').notNullable().defaultTo(0);
        table.boolean('useBoxDrawingFilter').notNullable().defaultTo(0);
        table.boolean('useHoistNicknameFilter').notNullable().defaultTo(0);
        table.boolean('useHoistUsernameFilter').notNullable().defaultTo(0);
        table.boolean('useZalgoUsernameFilter').notNullable().defaultTo(0);
        table.boolean('useZalgoNicknameFilter').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_BLACKLISTED_LINK, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_CAPS_SPAM, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_EMOTE_SPAM, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_EXTERNAL_LINK, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_MASS_PINGS, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_PROFANITY, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_REPEATED_TEXT, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_SPOILER_SPAM, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_ZALGO, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('ban').notNullable().defaultTo(0);
        table.boolean('kick').notNullable().defaultTo(0);
        table.boolean('mute').notNullable().defaultTo(0);
        table.boolean('gifban').notNullable().defaultTo(0);
        table.boolean('externalEmoteBan').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
        table.boolean('deleteMessage').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_HOIST_NICKNAME, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('changeNickname').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_HOIST_USERNAME, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('setNickname').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_ZALGO_NICKNAME, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('changeNickname').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_ACTION_ZALGO_USERNAME, table => {
        table.boolean('enabled').notNullable().defaultTo(0);
        table.boolean('setNickname').notNullable().defaultTo(0);
        table.boolean('report').notNullable().defaultTo(0);
      }),
      createTable(AUTOMOD_IGNORED_ROLES, table => {
        table.string('id').notNullable();
      }),
      createTable(AUTOMOD_IGNORED_CHANNELS, table => {
        table.string('id').notNullable();
      }),
      createTable(AUTOMOD_BLACKLISTED_LINKS, table => {
        table.string('link').notNullable();
        table.text('reason').notNullable();
      }),
      createTable(AUTOMOD_PROFANITIES, table => {
        table.string('regex').notNullable();
      }),
      createTable(DISCORD_PROFILES, table => {
        table.string('memberID').primary().notNullable();
        table.integer('coins').notNullable().defaultTo(0);
        table.integer('xp').notNullable().defaultTo(0);
        table.integer('level').notNullable().defaultTo(1);
        table.integer('totalStories').notNullable().defaultTo(0);
        table.integer('totalFacts').notNullable().defaultTo(0); 
      }),
      createTable(LEVEL_REWARDS, table => {
        table.string('memberID').primary();
        table.string('type').notNullable();
        table.string('key').notNullable();
        table.integer('requiredLevel').notNullable();
      }),
      createTable(MODMAIL_CONFIG, table => {
        table.string('guildID').notNullable();
        table.boolean('dm').notNullable().defaultTo(0);
        table.boolean('smtp').notNullable().defaultTo(0);
        table.string('channel');
      }),
      createTable(MODMAIL_INDIVIDUAL_CONFIG, table => {
        table.string('userID').notNullable();
        table.boolean('dm').notNullable().defaultTo(0);
        table.boolean('shouldEmail').notNullable().defaultTo(0);
        table.string('email');
      }),
      createTable(CARS, table => {
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.string('specificModel').notNullable();
      }),
      createTable(STARBOARD, table => {
        table.string('messageID').notNullable();
        table.string('starBoardMessageID').notNullable();
        table.string('messageContent').notNullable();
        table.string('authorID').notNullable();
      }),
      createTable(STARBOARD_CONFIG, table => {
        table.string('guildID').notNullable();
        table.boolean('enabled').notNullable().defaultTo(1);
        table.string('channelID');
      })
    ]);
  } catch (err) {
    console.log(err);
  } finally {
    db.destroy();
  }
})();
