import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'user-id',
      aliases: [],
      args: [['user', 'mentioned user']],
      cooldown: 30,
      description: 'Sends the users Discord ID',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.avatarURL({ dynamic: true });

    const embed = new MessageEmbed()
      .setAuthor(user.tag, avatar)
      .setDescription(`**${user.tag}**'s ID: \`${user.id}\``)
      .setColor('RANDOM')

    message.channel.send(embed);
  }
}
