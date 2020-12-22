import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class SpoilerSpamEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setAuthor('Spoiler-spam warning')
      .setDescription('You are not allowed to spam spoilers here!')
  }
}
