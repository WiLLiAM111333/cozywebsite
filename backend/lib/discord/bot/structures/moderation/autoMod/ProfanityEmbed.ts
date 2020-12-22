import { MessageEmbed } from "discord.js";
import { Constants } from '../../../../../../src/utils/constants';

const { RED } = Constants.EmbedColors;

export class ProfanityEmbed extends MessageEmbed {
  public constructor(profanity: string) {
    super();

    this
      .setColor(RED)
      .setDescription(`This word: \`${profanity}\` is not allowed here!`)
      .setAuthor('Profanity warning')
  }
}
