require('dotenv').config();
const Database = require('../dist/src/db/index');
/**
 * @type {import('knex')}
 */
const db = Database.db
const { Constants } = require('../dist/src/utils/constants');
const chalk = require('chalk');

const { KNEX_DB, TableNames } = Constants;

const {
  DISCORD_BANS,
  DISCORD_KICKS,
  DISCORD_MUTES,
  DISCORD_REPORTS,
  DISCORD_WARNS,
  RATELIMITS,
  USERS,
  WEBSITE_BANS,
  AUTOMOD_CONFIG,
  AUTOMOD_IGNORED_ROLES,
  AUTOMOD_IGNORED_CHANNELS,
  AUTOMOD_BLACKLISTED_LINKS,
  AUTOMOD_PROFANITIES
} = TableNames;

(async () => {
  try {
    const exists = await db.raw(`SHOW DATABASES LIKE '${KNEX_DB}'`);

    if(!exists[0].length) {
      await db.raw(`CREATE DATABASE ${KNEX_DB}`);
      console.log(chalk.cyan(`Created the database ${KNEX_DB}`));
    }

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
        table.text('reason').notNullable().defaultTo('No reason set');
      });

      console.log(chalk.cyan(`Created the table ${AUTOMOD_BLACKLISTED_LINKS}`));
    }

    if(!hasAutoModProfanities) {
      await db.schema.createTable(AUTOMOD_PROFANITIES, table => {
        table.string('regex').notNullable();
      });
    }

    console.log(chalk.cyan(`Created the table ${AUTOMOD_PROFANITIES}`));
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
})();
