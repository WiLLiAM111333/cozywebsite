import { AutoModConfig } from "./AutoModConfig";
import { db } from '../../../../../../../src/db/index';
import { Constants } from '../../../../../../../src/utils/constants';
import { AutoMod } from "../AutoMod";
import { AutoModActionsConfig } from "../actions/AutoModActionsConfig";

const {
  AUTOMOD_CONFIG,
  AUTOMOD_BLACKLISTED_LINKS,
  AUTOMOD_IGNORED_CHANNELS,
  AUTOMOD_IGNORED_ROLES,
  AUTOMOD_PROFANITIES,
  AUTOMOD_ACTION_BLACKLISTED_LINK,
  AUTOMOD_ACTION_ZALGO,
  AUTOMOD_ACTION_SPOILER_SPAM,
  AUTOMOD_ACTION_REPEATED_TEXT,
  AUTOMOD_ACTION_PROFANITY,
  AUTOMOD_ACTION_MASS_PINGS,
  AUTOMOD_ACTION_EXTERNAL_LINK,
  AUTOMOD_ACTION_EMOTE_SPAM,
  AUTOMOD_ACTION_CAPS_SPAM,
  AUTOMOD_ACTION_HOIST_NICKNAME,
  AUTOMOD_ACTION_HOIST_USERNAME
} = Constants.TableNames;

// Everything is private as it is intended to be used for internal use only
// I'm not sure how im gonna call updateConfig() yet, but we'll see when I implement it later
// I'll probably implement it when I have a front-end to the dashboard which will control this
// That will take several weeks if not a month or 2 of work
// This will control the configuration of AutoModActionsManager aswell
/* 
   This will be a trickier job than the base AutoMod class becuase of how 
   many different things it has to take into consideration. The room for 
   error is also ZERO, it cannot ban members because of an internal mistake
*/

export class AutoModConfigManager {
  private autoMod: AutoMod;
  private _config: AutoModConfig;
  private _actionsConfig: AutoModActionsConfig;

  public constructor(autoMod: AutoMod) {
    this.autoMod = autoMod;
    this._config = null;

    this.init();
  }

  private get config() {
    return this._config;
  }

  private set config(config: AutoModConfig) {
    this._config = config;
  }

  private get actionsConfig() {
    return this._actionsConfig;
  }

  private set actionsConfig(config: AutoModActionsConfig) {
    this._actionsConfig = config;
  }

  private init() {
    (async () => {
      try {
        this.config = await this.getAutoModConfig();
        this.actionsConfig = await this.getActionsConfig();
      } catch (err) {
        this.handleError(err);
      }
    })();
  }

  private async getAutoModConfig(): Promise<AutoModConfig> {
    try {
      const mainConfig = await db.table(AUTOMOD_CONFIG)
        .select('*')

      const ignoredRoles = (await db.table(AUTOMOD_IGNORED_ROLES))
        .map(data => data.id);
      
      const ignoredChannels = (await db.table(AUTOMOD_IGNORED_CHANNELS))
        .map(data => data.id);

      const blacklistedLinks = (await db.table(AUTOMOD_BLACKLISTED_LINKS))
        .map(data => data.link);

      const profanities = (await db.table(AUTOMOD_PROFANITIES))
        .map(data => {
          const str: string = data.regex;
  
          const lastSlash = str.lastIndexOf('/');
          const pattern = str.slice(1, lastSlash);
          const flags = str.slice(lastSlash + 1);
          
          return new RegExp(pattern, flags);
        });

      const config: AutoModConfig = {
        ...mainConfig[0],
        blacklistedLinks,
        ignoredChannels,
        ignoredRoles,
        profanities
      }

      this.autoMod.emit('configCreate', config);

      return config;
    } catch (err) {
      this.handleError(err);
    }
  }

  private async getActionsConfig(): Promise<AutoModActionsConfig> {
    try {
      const blackListedLink = await db.table(AUTOMOD_ACTION_BLACKLISTED_LINK);
      const capsSpam = await db.table(AUTOMOD_ACTION_CAPS_SPAM);
      const emoteSpam = await db.table(AUTOMOD_ACTION_EMOTE_SPAM);
      const externalLink = await db.table(AUTOMOD_ACTION_EXTERNAL_LINK);
      const massPings = await db.table(AUTOMOD_ACTION_MASS_PINGS);
      const repeatedText = await db.table(AUTOMOD_ACTION_REPEATED_TEXT);
      const profanity = await db.table(AUTOMOD_ACTION_PROFANITY);
      const spoilerSpam = await db.table(AUTOMOD_ACTION_SPOILER_SPAM);
      const zalgo = await db.table(AUTOMOD_ACTION_ZALGO);
      const hoistNickname = await db.table(AUTOMOD_ACTION_HOIST_NICKNAME);
      const hoistUsername = await db.table(AUTOMOD_ACTION_HOIST_USERNAME);

      const config: AutoModActionsConfig = {
        blacklistedLink: { ...blackListedLink[0] },
        capsSpam: { ...capsSpam[0] },
        emoteSpam: { ...emoteSpam[0] },
        externalLink: { ...externalLink[0] },
        massPings: { ...massPings[0] },
        profanity: { ...profanity[0] },
        repeatedText: { ...repeatedText[0] },
        spoilerSpam: { ...spoilerSpam[0] },
        zalgo: { ...zalgo[0] },
        hoistNickname: { ...hoistNickname[0] },
        hoistUsername: { ...hoistUsername[0] }
      }

      this.autoMod.emit('actionsConfigCreate', config);

      return config;
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: Error): void {
    console.log(err);
  }
}
