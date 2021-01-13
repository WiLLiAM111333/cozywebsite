import { Snowflake } from "discord.js";

export interface ModerationConfig {
  emoteBanRole: Snowflake;
  gifBanRole: Snowflake;
  mutedRole: Snowflake;
}
