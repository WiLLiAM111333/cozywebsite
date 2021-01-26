import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'icon',
      aliases: [],
      args: [],
      cooldown: 30,
      description: 'Sends an embed with the servers icon',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const embed = new MessageEmbed()
      .setColor('RANDOM')

    if(message.guild.icon) {
      embed.setImage(message.guild.iconURL({ dynamic: true, size: 2048 }))

      message.channel.send(embed);
    } else {
      const notFoundEmbed = new MessageEmbed(embed)
        .setDescription('You have not set an icon for this server!');

      message.channel.send(notFoundEmbed);
    }
  }
}
