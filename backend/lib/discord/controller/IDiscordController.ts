import { Snowflake } from "discord.js";

export interface IDiscordController {
  getAll(): Array<unknown>;
  getByID(id: Snowflake | string): unknown;
}
