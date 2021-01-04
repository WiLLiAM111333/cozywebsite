/*



This file is only for development and will be deleted and replaced by a CLI tool later on



*/

require('dotenv').config();
const { cyan } = require('chalk');
const Database = require('../dist/src/db/index');
/**
 * @type {import('knex')}
 */
const db = Database.db;
const { Constants } = require('../dist/src/utils/constants');
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
  AUTOMOD_ACTION_HOIST_USERNAME,
  AUTOMOD_ACTION_HOIST_NICKNAME,
  AUTOMOD_BLACKLISTED_LINKS,
  AUTOMOD_CONFIG,
  AUTOMOD_IGNORED_CHANNELS,
  AUTOMOD_IGNORED_ROLES,
  AUTOMOD_PROFANITIES,
  DISCORD_PROFILES
} = Constants.TableNames;

(async () => {
  try {
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
      /nigg.+/
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
    
    await db.table(AUTOMOD_CONFIG).insert({ 
      enabled: true,
      useProfanityFilter: true,
      useZalgoFilter: true,
      useCapsSpamFilter: true,
      useLinkFilter: true,
      useSpoilerSpamFilter: true,
      useMassPingFilter: true,
      useEmoteSpamFilter: true,
      useBlacklistedLinkFilter: true,
      useInviteLinkFilter: true
    });

    console.log(cyan(`Seeded ${AUTOMOD_CONFIG}`));
    
    for(const channel of ignoredChannels) {
      await db.table(AUTOMOD_IGNORED_CHANNELS).insert({ id: channel });
    }

    console.log(cyan(`Seeded ${AUTOMOD_IGNORED_CHANNELS}`));

    for(const role of ignoredRoles) {
      await db.table(AUTOMOD_IGNORED_ROLES).insert({ id: role });
    }

    console.log(cyan(`Seeded ${AUTOMOD_IGNORED_ROLES}`));

    for(const link of blacklistedLinks) {
      await db.table(AUTOMOD_BLACKLISTED_LINKS).insert({
        link,
        reason: 'DATABASE_SEED'
      });
    }

    console.log(cyan(`Seeded ${AUTOMOD_BLACKLISTED_LINKS}`));

    for(const profanity of profanities) {
      await db.table(AUTOMOD_PROFANITIES).insert({ regex: String(profanity) });
    }

    console.log(cyan(`Seeded ${AUTOMOD_PROFANITIES}`));

    await db.table(DISCORD_PROFILES).insert({
      memberID: '107424723050180608',
      coins: 0,
      xp: 0,
      level: 1
    });

    console.log(cyan(`Seeded ${DISCORD_PROFILES}`));

    await db.table(AUTOMOD_ACTION_BLACKLISTED_LINK).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_BLACKLISTED_LINK}`));

    await db.table(AUTOMOD_ACTION_CAPS_SPAM).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_CAPS_SPAM}`));

    await db.table(AUTOMOD_ACTION_EMOTE_SPAM).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_EMOTE_SPAM}`));

    await db.table(AUTOMOD_ACTION_EXTERNAL_LINK).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_EXTERNAL_LINK}`));

    await db.table(AUTOMOD_ACTION_MASS_PINGS).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_MASS_PINGS}`));

    await db.table(AUTOMOD_ACTION_REPEATED_TEXT).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_REPEATED_TEXT}`));

    await db.table(AUTOMOD_ACTION_SPOILER_SPAM).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_SPOILER_SPAM}`));

    await db.table(AUTOMOD_ACTION_ZALGO).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_ZALGO}`));

    await db.table(AUTOMOD_ACTION_PROFANITY).insert(defaultActionsObj);
    console.log(cyan(`Seeded ${AUTOMOD_ACTION_PROFANITY}`));

    await db.table(AUTOMOD_ACTION_HOIST_NICKNAME).insert({
      enabled: true,
      changeNickname: true,
      report: true
    });

    console.log(cyan(`Seeded ${AUTOMOD_ACTION_HOIST_NICKNAME}`));

    await db.table(AUTOMOD_ACTION_HOIST_USERNAME).insert({
      enabled: true,
      setNickname: true,
      report: true
    });

    console.log(cyan(`Seeded ${AUTOMOD_ACTION_HOIST_USERNAME}`));
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
})();
