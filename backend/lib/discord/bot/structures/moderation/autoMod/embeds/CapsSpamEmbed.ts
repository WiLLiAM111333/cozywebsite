import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class CapsSpamEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setAuthor('Caps-spam warning')
      .setDescription('No caps spamming allowed!');
  }
}
