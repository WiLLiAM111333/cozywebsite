import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class ExternalLinkEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setColor('External link warning')
      .setDescription('External links are not allowed here!');
  }
}
