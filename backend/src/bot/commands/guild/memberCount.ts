import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'membercount',
      aliases: ['usercount', 'user-count', 'member-count'],
      args: [],
      cooldown: 30,
      description: 'Sends an embed with the servers member count',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const totalCount = message.guild.memberCount;
    const members = message.guild.members.cache.filter(member => !member.user.bot).size;
    const bots = message.guild.members.cache.filter(member => member.user.bot).size;
    
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`**Users**: ${members}\n**Bots**: ${bots}\n**Total members**: ${totalCount}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.reply(embed);
  }                      
}
