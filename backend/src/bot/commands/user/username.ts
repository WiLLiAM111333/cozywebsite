import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'username',
      aliases: [],
      args: [['user', 'mentioned user']],
      cooldown: 30,
      description: 'Sends the users\'s username',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.avatarURL({ dynamic: true });

    const embed = new MessageEmbed()
      .setAuthor(`${user.tag}'s username: \`${user.username}\``, avatar)
      .setColor('RANDOM')

    message.channel.send(embed);
  }
}
