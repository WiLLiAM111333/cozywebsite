import { Message } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";
import { ProfanityEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/ProfanityEmbed";
import { ZalgoEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/ZalgoEmbed";

export const event = (client: CozyClient, message: Message): void => {
  if(message.author.bot) return;

  const args = message.content.toLowerCase().split(/ +/);
  const command = args[0];

  if(client.autoModerator.isProfanity(message)) {
    message.delete();

    const embed = new ProfanityEmbed(client.autoModerator.getProfanity(args))
    message.channel.send(`${message.author.toString()},`, { embed });
  }

  if(client.autoModerator.isZalgo(message)) {
    message.delete();

    const embed = new ZalgoEmbed();
    message.channel.send(`${message.author.toString()},`, { embed });
  }
}
