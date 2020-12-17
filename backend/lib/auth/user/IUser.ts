import { Snowflake } from 'discord.js';

export interface IUser {
  discordUserID: Snowflake;
  websiteUserID: string;
  createdAt: string;
}
