import { Snowflake } from "discord.js";

export interface XPEvents {
  levelUp: [Snowflake, number];
  levelDown: [Snowflake, number];
  resetXP: [Snowflake];
  resetLevel: [Snowflake];
  levelRewardGiven: [Snowflake, string];
}
