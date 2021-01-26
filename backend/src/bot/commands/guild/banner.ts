import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'banner',
      aliases: [],
      args: [],
      cooldown: 30,
      description: 'Sends an embed with the servers banner',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))  

    if(message.guild.banner) {
      embed.setImage(message.guild.bannerURL({ size: 2048 }))

      message.channel.send(embed);
    } else {
      const notFoundEmbed = new MessageEmbed(embed)
        .setColor('#ff0000')

      if(message.guild.premiumTier < 2) {
        notFoundEmbed.setDescription('This server has not unlocked the banner feature yet. You must hit Nitro Boost level 2 before you can use this command!')
      } else {
        notFoundEmbed.setDescription('You have not set a banner for this server');
      }

      message.channel.send(notFoundEmbed);
    }
  }
}
