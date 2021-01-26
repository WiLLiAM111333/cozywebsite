import { red } from 'chalk';
import { Client } from "discord.js";

export const event = (client: Client) => {
  console.log(`[${red('BOT')}] Ready!`);
}
