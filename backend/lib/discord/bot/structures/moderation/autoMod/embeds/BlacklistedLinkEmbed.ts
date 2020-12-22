import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class BlacklistLinkEmbed extends MessageEmbed {
  public constructor() {
    super();

    this
      .setColor(RED)
      .setDescription('This link has been banned from being used!')
      .setAuthor('Blacklisted link warning')
  }
}
