import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'discriminator',
      aliases: ['last4', 'last-4', 'tagnumbers', 'tag-numbers'],
      args: [['user', 'mentioned user']],
      cooldown: 30,
      description: 'Sends the user\'s discriminator',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.avatarURL({ dynamic: true });

    const embed = new MessageEmbed()
      .setAuthor(`${user.tag}'s discriminator: \`${user.discriminator}\``, avatar)
      .setColor('RANDOM')
      .setFooter('A user\'s discriminator are the 4 digits in their tag after the `#`')

    message.channel.send(embed);
  }
}
