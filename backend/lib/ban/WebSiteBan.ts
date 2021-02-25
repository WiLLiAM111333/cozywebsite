import { Snowflake } from "discord.js";
import { IWebSiteBan } from "./IWebSiteBan";
import { WebSiteBanConstructor } from "./WebSiteBanConstructor";
import { Base } from '../Base';
import { Constants } from '../../src/utils/constants';

const { WEBSITE_BANS } = Constants.TableNames;

export class WebSiteBan extends Base implements IWebSiteBan {
  public websiteUserID: string;
  public discordUserID: Snowflake;
  public reason: string;
  public bannedAt: string;

  public constructor(data: WebSiteBanConstructor) {
    super();
    
    this.websiteUserID = data.websiteUserID;
    this.discordUserID = data.discordUserID;
    this.reason = data.reason || 'No reason set';
    this.bannedAt = new Date().toLocaleString();
  }
}
