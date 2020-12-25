import { AutoModConfig } from "./AutoModConfig";
import { db } from '../../../../../../src/db/index';
import { Constants } from '../../../../../../src/utils/constants';
import { AutoMod } from "./AutoMod";

const {
  AUTOMOD_CONFIG,
  AUTOMOD_BLACKLISTED_LINKS,
  AUTOMOD_IGNORED_CHANNELS,
  AUTOMOD_IGNORED_ROLES,
  AUTOMOD_PROFANITIES
} = Constants.TableNames;

// Everything is private as it is intended to be used for internal use only
// I'm not sure how im gonna call updateConfig() yet, but we'll see when I implement it later
// I'll probably implement it when I have a front-end to the dashboard which will control this
// That will take several weeks if not a month or 2 of work

export class AutoModConfigManager {
  private autoMod: AutoMod;
  private _config: AutoModConfig;

  public constructor(autoMod: AutoMod) {
    this.autoMod = autoMod;
    this._config = null;

    this.init();
  }

  private init() {
    (async () => {
      try {
        await this.createConfig();
      } catch (err) {
        this.handleError(err);
      }
    })();
  }

  private async createConfig(): Promise<AutoModConfig> {
    try {
      const mainConfig = await db.table(AUTOMOD_CONFIG);
      const ignoredRoles = await db.table(AUTOMOD_IGNORED_ROLES);
      const ignoredChannels = await db.table(AUTOMOD_IGNORED_CHANNELS);
      const profanityData = await db.table(AUTOMOD_PROFANITIES);
      const blacklistedLinks = await db.table(AUTOMOD_BLACKLISTED_LINKS);

      const profanities: Array<RegExp> = profanityData.map(data => {
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
      this.config = config;
      
      return config;
    } catch (err) {
      this.handleError(err);
    }
  }

  private get config() {
    return this._config;
  }

  private set config(config: AutoModConfig) {
    this._config = config;
  }

  private async updateConfig<T extends keyof typeof Constants.TableNames>(table: T, whereObj: object, newConfig: object): Promise<void> {
    try {
      this.config = await db.table(table.toLowerCase())
        .where(whereObj)
        .update(newConfig)

      this.autoMod.emit('configUpdate', this.config);
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: Error): void {
    console.log(err);
  }
}
