require('dotenv').config();
const Database = require('../dist/src/db/index');
/**
 * Temporary for development so I can get type casting and autocomplete
 * @type {import('knex')}
 */
const db = Database.db
const { Constants } = require('../dist/src/utils/constants');
const chalk = require('chalk');

const { KNEX_DB, TableNames } = Constants;

const {
  AUTOMOD_ACTION_BLACKLISTED_LINK,
  AUTOMOD_ACTION_CAPS_SPAM,
  AUTOMOD_ACTION_EMOTE_SPAM,
  AUTOMOD_ACTION_EXTERNAL_LINK,
  AUTOMOD_ACTION_MASS_PINGS,
  AUTOMOD_ACTION_PROFANITY,
  AUTOMOD_ACTION_REPEATED_TEXT,
  AUTOMOD_ACTION_SPOILER_SPAM,
  AUTOMOD_ACTION_ZALGO,
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
  RATELIMITS,
  USERS,
  WEBSITE_BANS,
  DISCORD_PROFILES,
  LEVEL_REWARDS,
  AUTOMOD_ACTION_HOIST_USERNAME,
  AUTOMOD_ACTION_HOIST_NICKNAME
} = TableNames;

(async () => {
  try {
    await db.raw(`USE ${KNEX_DB}`);

    const hasBans = await db.schema.hasTable(DISCORD_BANS);
    const hasKicks = await db.schema.hasTable(DISCORD_KICKS);
    const hasMutes = await db.schema.hasTable(DISCORD_MUTES);
    const hasReports = await db.schema.hasTable(DISCORD_REPORTS);
    const hasWarns = await db.schema.hasTable(DISCORD_WARNS);
    const hasRateLimits = await db.schema.hasTable(RATELIMITS);
    const hasUsers = await db.schema.hasTable(USERS);
    const hasWebsiteBans = await db.schema.hasTable(WEBSITE_BANS);
    const hasAutoModCFG = await db.schema.hasTable(AUTOMOD_CONFIG);
    const hasAutoModIgnoredRoles = await db.schema.hasTable(AUTOMOD_IGNORED_ROLES);
    const hasAutoModIgnoredChannels = await db.schema.hasTable(AUTOMOD_IGNORED_CHANNELS);
    const hasAutoModBlacklistedLinks = await db.schema.hasTable(AUTOMOD_BLACKLISTED_LINKS);
    const hasAutoModProfanities = await db.schema.hasTable(AUTOMOD_PROFANITIES);
    const hasBlackListedLinkAction = await db.schema.hasTable(AUTOMOD_ACTION_BLACKLISTED_LINK);
    const hasCapsSpamAction = await db.schema.hasTable(AUTOMOD_ACTION_CAPS_SPAM);
    const hasEmoteSpamAction = await db.schema.hasTable(AUTOMOD_ACTION_EMOTE_SPAM);
    const hasExternalLinkAction = await db.schema.hasTable(AUTOMOD_ACTION_EXTERNAL_LINK);
    const hasMassPingsAction = await db.schema.hasTable(AUTOMOD_ACTION_MASS_PINGS);
    const hasProfanityAction = await db.schema.hasTable(AUTOMOD_ACTION_PROFANITY);
    const hasRepeatedTextAction = await db.schema.hasTable(AUTOMOD_ACTION_REPEATED_TEXT);
    const hasSpoilerSpamAction = await db.schema.hasTable(AUTOMOD_ACTION_SPOILER_SPAM);
    const hasZalgoAction = await db.schema.hasTable(AUTOMOD_ACTION_ZALGO);
    const hasHoistUsernameAction = await db.schema.hasTable(AUTOMOD_ACTION_HOIST_USERNAME);
    const hasHoistNicknameAction = await db.schema.hasTable(AUTOMOD_ACTION_HOIST_NICKNAME);
    const hasProfiles = await db.schema.hasTable(DISCORD_PROFILES);
    const hasLevelRewards = await db.schema.hasTable(LEVEL_REWARDS);

    if(!hasBans) {
      await db.schema.createTable(DISCORD_BANS, table => {
        table.string('discordUserID').notNullable();
        table.string('websiteUserID').notNullable();
        table.text('reason').notNullable()
        table.date('bannedAt').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${DISCORD_BANS}`));
    }

    if(!hasKicks) {
      await db.schema.createTable(DISCORD_KICKS, table => {
        table.string('discordUserID').notNullable();
        table.string('websiteUserID').notNullable();
        table.text('reason').notNullable()
        table.date('kickedAt').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${DISCORD_KICKS}`));
    }

    if(!hasMutes) {
      await db.schema.createTable(DISCORD_MUTES, table => {
        table.string('discordUserID').notNullable();
        table.string('websiteUserID').notNullable();
        table.string('muterDiscordID').notNullable();
        table.string('muterWebsiteID').notNullable();
        table.text('reason').notNullable()
        table.date('mutedAt').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${DISCORD_MUTES}`));
    }

    if(!hasReports) {
      await db.schema.createTable(DISCORD_REPORTS, table => {
        table.string('discordUserID').notNullable();
        table.string('websiteUserID').notNullable();
        table.string('reporterDiscordID').notNullable();
        table.string('reporterWebsiteID').notNullable();
        table.text('reason').notNullable()
        table.date('reportedAt').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${DISCORD_REPORTS}`));
    }

    if(!hasWarns) {
      await db.schema.createTable(DISCORD_WARNS, table => {
        table.string('discordUserID').notNullable();
        table.string('websiteUserID').notNullable();
        table.text('reason').notNullable()
        table.string('warnerDiscordID').notNullable();
        table.string('warnerWebsiteID').notNullable();
        table.date('warnedAt').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${DISCORD_WARNS}`));
    }

    if(!hasRateLimits) {
      // Keep working on this
      await db.schema.createTable(RATELIMITS, table => {
        table.string('discordUserID').notNullable();
        table.string('websiteUserID').notNullable();
        table.date('rateLimitedAt').notNullable()
        table.integer('requestAmount').notNullable();
      });
      
      console.log(chalk.cyan(`Created the table ${RATELIMITS}`));
    }

    if(!hasUsers) {
      await db.schema.createTable(USERS, table => {
        // Keep working on this
        table.string('websiteUserID').notNullable();
        table.string('discordUserID').notNullable();
        table.date('createdAt').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${USERS}`));
    }

    if(!hasWebsiteBans) {
      await db.schema.createTable(WEBSITE_BANS, table => {
        table.string('websiteUserID').notNullable();
        table.string('discordUserID').notNullable();
        table.date('bannedAt').notNullable()
        table.text('reason').notNullable()
      });

      console.log(chalk.cyan(`Created the table ${WEBSITE_BANS}`));
    }

    if(!hasAutoModCFG) {
      await db.schema.createTable(AUTOMOD_CONFIG, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('useProfanityFilter').notNullable().defaultTo(false);
        table.boolean('useZalgoFilter').notNullable().defaultTo(false);
        table.boolean('useCapsSpamFilter').notNullable().defaultTo(false);
        table.boolean('useLinkFilter').notNullable().defaultTo(false);
        table.boolean('useSpoilerSpamFilter').notNullable().defaultTo(false);
        table.boolean('useMassPingFilter').notNullable().defaultTo(false);
        table.boolean('useEmoteSpamFilter').notNullable().defaultTo(false);
        table.boolean('useBlacklistedLinkFilter').notNullable().defaultTo(false);
        table.boolean('useInviteLinkFilter').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_CONFIG}`));
    }

    if(!hasBlackListedLinkAction) {
      await db.schema.createTable(AUTOMOD_ACTION_BLACKLISTED_LINK, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_BLACKLISTED_LINK}`));
    }

    if(!hasCapsSpamAction) {
      await db.schema.createTable(AUTOMOD_ACTION_CAPS_SPAM, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_CAPS_SPAM}`));
    }

    if(!hasEmoteSpamAction) {
      await db.schema.createTable(AUTOMOD_ACTION_EMOTE_SPAM, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_EMOTE_SPAM}`));
    }

    if(!hasExternalLinkAction) {
      await db.schema.createTable(AUTOMOD_ACTION_EXTERNAL_LINK, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_EXTERNAL_LINK}`));
    }

    if(!hasMassPingsAction) {
      await db.schema.createTable(AUTOMOD_ACTION_MASS_PINGS, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_MASS_PINGS}`));
    }

    if(!hasProfanityAction) {
      await db.schema.createTable(AUTOMOD_ACTION_PROFANITY, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_PROFANITY}`));
    }
    
    if(!hasRepeatedTextAction) {
      await db.schema.createTable(AUTOMOD_ACTION_REPEATED_TEXT, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_REPEATED_TEXT}`));
    }

    if(!hasSpoilerSpamAction) {
      await db.schema.createTable(AUTOMOD_ACTION_SPOILER_SPAM, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_SPOILER_SPAM}`));
    }

    if(!hasZalgoAction) {
      await db.schema.createTable(AUTOMOD_ACTION_ZALGO, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('ban').notNullable().defaultTo(false);
        table.boolean('kick').notNullable().defaultTo(false);
        table.boolean('mute').notNullable().defaultTo(false);
        table.boolean('gifban').notNullable().defaultTo(false);
        table.boolean('externalEmoteBan').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
        table.boolean('deleteMessage').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_ZALGO}`));
    }

    if(!hasHoistNicknameAction) {
      await db.schema.createTable(AUTOMOD_ACTION_HOIST_NICKNAME, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('changeNickname').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_HOIST_NICKNAME}`));
    }

    if(!hasHoistUsernameAction) {
      await db.schema.createTable(AUTOMOD_ACTION_HOIST_USERNAME, table => {
        table.boolean('enabled').notNullable().defaultTo(false);
        table.boolean('setNickname').notNullable().defaultTo(false);
        table.boolean('report').notNullable().defaultTo(false);
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_ACTION_HOIST_USERNAME}`));
    }

    if(!hasAutoModIgnoredRoles) {
      await db.schema.createTable(AUTOMOD_IGNORED_ROLES, table => {
        table.string('id').notNullable();
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_IGNORED_ROLES}`));
    }

    if(!hasAutoModIgnoredChannels) {
      await db.schema.createTable(AUTOMOD_IGNORED_CHANNELS, table => {
        table.string('id').notNullable();
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_IGNORED_CHANNELS}`));
    }

    if(!hasAutoModBlacklistedLinks) {
      await db.schema.createTable(AUTOMOD_BLACKLISTED_LINKS, table => {
        table.string('link').notNullable();
        table.text('reason').notNullable();
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_BLACKLISTED_LINKS}`));
    }

    if(!hasAutoModProfanities) {
      await db.schema.createTable(AUTOMOD_PROFANITIES, table => {
        table.string('regex').notNullable();
      });
      
      console.log(chalk.cyan(`Created the table ${AUTOMOD_PROFANITIES}`));
    }

    if(!hasProfiles) {
      await db.schema.createTable(DISCORD_PROFILES, table => {
        table.string('memberID').primary().notNullable();
        table.integer('coins').notNullable().defaultTo(0);
        table.integer('xp').notNullable().defaultTo(0);
        table.integer('level').notNullable().defaultTo(1);
      });

      console.log(chalk.cyan(`Created the table ${DISCORD_PROFILES}`));
    }

    if(!hasLevelRewards) {
      await db.schema.createTable(LEVEL_REWARDS, table => {
        table.string('memberID').primary();
        table.string('type').notNullable();
        table.string('key').notNullable();
        table.integer('requiredLevel').notNullable();
      });

      console.log(chalk.cyan(`Created the table ${LEVEL_REWARDS}`));
    }
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
})();
