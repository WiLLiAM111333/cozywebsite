import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class EmoteSpamEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setDescription('You are not allowed to spam emotes here!')
      .setAuthor('Emote-spam warning')
  }
}
