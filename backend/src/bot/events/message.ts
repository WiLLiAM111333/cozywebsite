import { Message } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";
import { BlacklistLinkEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/BlacklistedLinkEmbed";
import { CapsSpamEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/CapsSpamEmbed";
import { EmoteSpamEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/EmoteSpamEmbed";
import { ExternalLinkEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/ExternalLinkEmbed";
import { MassPingEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/MassPingEmbed";
import { ProfanityEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/ProfanityEmbed";
import { SpoilerSpamEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/SpoilerSpamEmbed";
import { ZalgoEmbed } from "../../../lib/discord/bot/structures/moderation/autoMod/embeds/ZalgoEmbed";

export const event = (client: CozyClient, message: Message): void => {
  if(message.author.bot || message.author.id !== '107424723050180608') return;

  const args = message.content.toLowerCase().split(/ +/);
  const command = args[0];

  if(client.autoMod.isProfanity(message)) {
    message.delete();

    const profanity = client.autoMod.getProfanity(args);
    const embed = new ProfanityEmbed(profanity);

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('profanity', message.content, message.author);
  }

  if(client.autoMod.isZalgo(message)) {
    message.delete();

    const embed = new ZalgoEmbed();

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('zalgo', message.content, message.author);
  }

  if(client.autoMod.isCapsSpam(message)) {
    message.delete();

    const embed = new CapsSpamEmbed();

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('capsSpam', message.author);
  }

  if(client.autoMod.isExternalLink(message)) {
    message.delete();

    const embed = new ExternalLinkEmbed();

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('externalLink', message.content, message.author);
  }

  if(client.autoMod.isSpoilerSpam(message)) {
    message.delete();

    const embed = new SpoilerSpamEmbed()

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('spoilerSpam', message.author);
  }

  if(client.autoMod.isMassPing(message)) {
    message.delete();

    const embed = new MassPingEmbed();

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('massPings', message.author);
  }

  if(client.autoMod.isEmoteSpam(message)) {
    message.delete();

    const embed = new EmoteSpamEmbed();

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('emoteSpam', message.author);
  }

  if(client.autoMod.isBlacklistedLink(message)) {
    message.delete();

    const embed = new BlacklistLinkEmbed();

    message.channel.send(`${message.author.toString()},`, { embed });
    client.autoMod.emit('blacklistedLink', message.author);
  }
}
