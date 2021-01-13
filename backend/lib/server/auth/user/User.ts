import { IUser } from './IUser';
import { Snowflake } from 'discord.js';
import { Base } from '../../..';

export class User extends Base implements IUser {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public createdAt: string;

  public constructor(data: IUser) {
    super();
    
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.createdAt = data.createdAt || Date.now().toLocaleString();
  }
}
