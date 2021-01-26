import { Message } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";
import { ProfileManager } from "../../../lib/discord/bot/structures/profile/ProfileManager";

export const event = (client: CozyClient, message: Message): void => {
  if(message.author.bot) return;

  new ProfileManager().handleMessage(message);
  client.autoMod.handleMessage(message);

  const prefix = client.commandHandler.prefix;

  const args = message.content.startsWith(prefix)
    ? message.content.slice(prefix.length).split(/ +/)
    : message.content.split(/ +/);

  const command = args[0].toLowerCase();

  if(client.commandHandler.hasCommand(command)) {
    client.commandHandler.execute(command, message, args);
  }
}
