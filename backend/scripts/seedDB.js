/*

This file is only for development and will be deleted and replaced by a CLI tool later on
(this is why it's made with miminal effort)

No users as I havent done auth yet.

*/

require('dotenv').config();
const { cyan, bold, greenBright } = require('chalk');
const { v4: uuidv4 } = require('uuid');
const Database = require('../dist/src/db/index');
/**
 * @type {import('knex')}
 */
const db = Database.db;
const { Constants } = require('../dist/src/utils/constants');
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
  DISCORD_PROFILES,
  LEVEL_REWARDS,
  MODMAIL_CONFIG,
  MODMAIL_INDIVIDUAL_CONFIG
} = Constants.TableNames;

(async () => {
  const seed = async (table, data) => {
    try {
      await db.table(table).insert(data);

      console.log(
        cyan(`Seeded the ${table} table with:`), 
        typeof data === 'string' ? bold(greenBright(data)) : data
      );
    } catch (err) {
      console.error(err);
    }
  } 

  try {
    const DB_SEED = 'DATABASE_SEED';

    const ignoredChannels = [
      '340336461243088906',
      '641250415509372929',
      '700898588338683985',
      '649062322190680064',
      '703813226529554512',
      '658592095438766100',
      '683796407152541874',
      '653537797021630467',
      '792566541916962826'
    ]
    
    const ignoredRoles = [
      '792566232113086485'
    ]
    
    const blacklistedLinks = [
      'https://www.some-fake-url-that-does-not-exist-ha-ha'
    ]

    const profanities = [
      /nigg.+/,
    ]

    const defaultActionsObj = {
      enabled: true,
      ban: false,
      kick: false,
      mute: false,
      gifban: false,
      externalEmoteBan: false,
      report: true,
      deleteMessage: true
    }

    const discordBansObj = {
      userID: '798567911194492950',
      guildID: '340336461243088906',
      banID: uuidv4(),
      reason: DB_SEED,
      unbanned: false,
      bannedAt: new Date().toLocaleString()
    }

    const discordKicksObj = {
      userID: '798567911194492950',
      guildID: '340336461243088906',
      kickID: uuidv4(),
      reason: DB_SEED,
      kickedAt: new Date().toLocaleString()
    }

    const discordMutesObj = {
      guildID: '340336461243088906',
      userID: '798567911194492950',
      muterUserID: '107424723050180608',
      muteID: uuidv4(),
      reason: DB_SEED,
      mutedAt: new Date().toLocaleString()
    }

    const discordReportsObj = {
      guildID: '340336461243088906',
      userID: '798567911194492950',
      reporterUserID: '107424723050180608',
      reportID: uuidv4(),
      reason: DB_SEED,
      reportedAt: new Date().toLocaleString()
    }

    const discordWarnsObj = {
      guildID: '340336461243088906',
      userID: '798567911194492950',
      warnerUserID: '107424723050180608',
      warnID: uuidv4(),
      reason: DB_SEED,
      warnedAt: new Date().toLocaleString()
    }

    const moderationCFGObj = {
      guildID: '340336461243088906',
      staffRole: '712283150486863902',
      mutedRole: '658581639080837158',
      emoteBanRole: '755844207326789632',
      gifBanRole: '721193485235126304'
    }

    const levelRewardsObj = {
      memberID: '727990509632618533',
      type: 'role',
      key: '727990509632618533',
      requiredLevel: 5
    }

    const modMailCFGObject = {
      guildID: '340336461243088906',
      dm: true,
      smtp: true,
      channel: '664930323066257408'
    }

    const individualModMailCFGObj = {
      userID: '798567911194492950',
      dm: true,
      shouldEmail: true,
      // Haha you thought I'd give you an email to spam
      email: process.env.DATABASE_SEED_EMAIL
    }

    await Promise.all([
      seed(AUTOMOD_ACTION_BLACKLISTED_LINK, defaultActionsObj),
      seed(AUTOMOD_ACTION_CAPS_SPAM, defaultActionsObj),
      seed(AUTOMOD_ACTION_EMOTE_SPAM, defaultActionsObj),
      seed(AUTOMOD_ACTION_EXTERNAL_LINK, defaultActionsObj),
      seed(AUTOMOD_ACTION_MASS_PINGS, defaultActionsObj),
      seed(AUTOMOD_ACTION_REPEATED_TEXT, defaultActionsObj),
      seed(AUTOMOD_ACTION_SPOILER_SPAM, defaultActionsObj),
      seed(AUTOMOD_ACTION_ZALGO, defaultActionsObj),
      seed(AUTOMOD_ACTION_PROFANITY, defaultActionsObj),
      seed(DISCORD_BANS, discordBansObj),
      seed(DISCORD_KICKS, discordKicksObj),
      seed(DISCORD_MUTES, discordMutesObj),
      seed(DISCORD_REPORTS, discordReportsObj),
      seed(DISCORD_WARNS, discordWarnsObj),
      seed(MODERATION_CONFIG, moderationCFGObj),
      seed(LEVEL_REWARDS, levelRewardsObj),
      seed(MODMAIL_CONFIG, modMailCFGObject),
      seed(MODMAIL_INDIVIDUAL_CONFIG, individualModMailCFGObj),
      seed(AUTOMOD_CONFIG, { 
        enabled: true,
        useProfanityFilter: true,
        useZalgoFilter: true,
        useCapsSpamFilter: true,
        useLinkFilter: true,
        useSpoilerSpamFilter: true,
        useMassPingFilter: true,
        useEmoteSpamFilter: true,
        useBlacklistedLinkFilter: true,
        useInviteLinkFilter: true,
        useBoxDrawingFilter: true,
        useHoistNicknameFilter: true,
        useHoistUsernameFilter: true,
        useZalgoUsernameFilter: true,
        useZalgoNicknameFilter: true
      }),
      seed(AUTOMOD_ACTION_HOIST_NICKNAME, {
        enabled: true,
        changeNickname: true,
        report: true
      }),
      seed(DISCORD_PROFILES, {
        memberID: '107424723050180608',
        coins: 0,
        xp: 0,
        level: 1
      }),
      seed(AUTOMOD_ACTION_HOIST_USERNAME, {
        enabled: true,
        setNickname: true,
        report: true
      }),
      seed(AUTOMOD_ACTION_ZALGO_NICKNAME, {
        enabled: true,
        changeNickname: true,
        report: true
      }),
      seed(AUTOMOD_ACTION_ZALGO_USERNAME, {
        enabled: true,
        setNickname: true,
        report: true
      }),
    ]);
    
    for(const id of ignoredChannels) {
      await seed(AUTOMOD_IGNORED_CHANNELS, { id });
    }

    for(const id of ignoredRoles) {
      await seed(AUTOMOD_IGNORED_ROLES, { id });
    }

    for(const link of blacklistedLinks) {
      const reason = DB_SEED;
      await seed(AUTOMOD_BLACKLISTED_LINKS, { link, reason });
    }

    for(const profanity of profanities) {
      await seed(AUTOMOD_PROFANITIES, { regex: String(profanity) });
    }
  } catch (err) {
    console.log(err);
  } finally {
    db.destroy();
  }
})();
