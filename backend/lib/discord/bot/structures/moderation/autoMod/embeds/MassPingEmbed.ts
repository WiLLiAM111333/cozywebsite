import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class MassPingEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setDescription(`Stop mass-pinging`)
      .setAuthor('Mass-ping warning')
  }
}
