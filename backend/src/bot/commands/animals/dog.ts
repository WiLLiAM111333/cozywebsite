import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'dog',
      args: [],
      aliases: ['woof'],
      ownerOnly: false,
      cooldown: 60,
      description: 'Sends a random dog image with a fact. Note that the fact doesnt match the image.',
      clientPerms: [
        'SEND_MESSAGES',
        'ATTACH_FILES',
        'EMBED_LINKS'
      ],
      userPerms: ['VIEW_CHANNEL']
    });
  }

  public async run(client: CozyClient, message: Message, args: Array<string>): Promise<void> {
    const { fact, image } = await client.animalManager.getDogData();

    const embed = new MessageEmbed()
      .setColor('#0013e6')
      .setDescription(fact)
      .setImage(image)
      .setFooter('The fact may not match the image');

    message.channel.send(embed);
  }
}
