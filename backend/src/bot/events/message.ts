import { Message, TextChannel } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";
import { ProfileManager } from "../../../lib/discord/bot/structures/profile/ProfileManager";

export const event = (client: CozyClient, message: Message): void => {
  if(message.author.bot) return;
  const channel = message.channel as TextChannel;

  new ProfileManager().handleMessage(message);
  client.autoMod.handleMessage(message);
}
