import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class ZalgoEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setAuthor('Zalgo warning')
      .setDescription('Zalgo is not allowed on this server')
  }
}
