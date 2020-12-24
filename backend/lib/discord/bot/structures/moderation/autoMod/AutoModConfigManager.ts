import { AutoModConfig } from "./AutoModConfig";
import { db } from '../../../../../../src/db/index';
import { Constants } from '../../../../../../src/utils/constants';

const {
  AUTOMOD_CONFIG,
  AUTOMOD_BLACKLISTED_LINKS,
  AUTOMOD_IGNORED_CHANNELS,
  AUTOMOD_IGNORED_ROLES,
  AUTOMOD_PROFANITIES
} = Constants.TableNames;

export class AutoModConfigManager {
  public async getConfig(): Promise<AutoModConfig> {
    try {
      const mainConfig = await db.table(AUTOMOD_CONFIG);
      const ignoredRoles = await db.table(AUTOMOD_IGNORED_ROLES);
      const ignoredChannels = await db.table(AUTOMOD_IGNORED_CHANNELS);
      const profanityData = await db.table(AUTOMOD_PROFANITIES);
      const blacklistedLinks = await db.table(AUTOMOD_BLACKLISTED_LINKS);

      const profanities = profanityData.map((data) => {
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

      return config;
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: Error): void {
    console.log(err);
  }
}
