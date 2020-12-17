require('dotenv').config();
const { db } = require('../dist/src/db/index');
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
  COMMANDS,
  COMMAND_CONFIGS
} = TableNames;

(async () => {
  try {
    const exists = await db.raw(`SHOW DATABASES LIKE '${KNEX_DB}'`);

    if(!exists[0].length) {
      await db.raw(`CREATE DATABASE ${KNEX_DB}`);
      console.log(chalk.cyan(`Created the database ${KNEX_DB}`));
    }

    await db.raw(`USE ${KNEX_DB}`)

    const hasBans = await db.schema.hasTable(DISCORD_BANS);
    const hasKicks = await db.schema.hasTable(DISCORD_KICKS);
    const hasMutes = await db.schema.hasTable(DISCORD_MUTES);
    const hasReports = await db.schema.hasTable(DISCORD_REPORTS);
    const hasWarns = await db.schema.hasTable(DISCORD_WARNS);
    const hasRateLimits = await db.schema.hasTable(RATELIMITS);
    const hasUsers = await db.schema.hasTable(USERS);
    const hasWebsiteBans = await db.schema.hasTable(WEBSITE_BANS);
    const hasCommands = await db.schema.hasTable(COMMANDS);
    const hasCommandCFGS = await db.schema.hasTable(COMMAND_CONFIGS);
    
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

    if(!hasCommands) {
      await db.schema.createTable(COMMANDS, table => {
        table.uuid('ID').notNullable();
        table.string('name').notNullable();
        table.text('args').notNullable();
        table.text('description').notNullable();
        table.text('aliases').notNullable();
      });

      console.log(chalk.cyan(`Created the table ${COMMANDS}`));
    }

    if(!hasCommandCFGS) {
      await db.schema.createTable(COMMAND_CONFIGS, table => {
        table.uuid('ID').notNullable();
        table.integer('cooldown').notNullable();
        table.boolean('ownerOnly').notNullable();
        table.text('clientPerms').notNullable();
        table.text('userPerms').notNullable();
      });

      console.log(chalk.cyan(`Created the table ${COMMAND_CONFIGS}`));
    }
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
})();
