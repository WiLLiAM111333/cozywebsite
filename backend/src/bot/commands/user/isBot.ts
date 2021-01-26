import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'bot',
      aliases: ['isbot', 'is-bot'],
      args: [['user', 'mentioned user']],
      cooldown: 30,
      description: 'Checks if the user is a bot. This does not work on self bots',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.avatarURL({ dynamic: true });

    const embed = new MessageEmbed()
      .setAuthor(`${user.tag} is ${user.bot ? '' : 'not'} a bot!`, avatar)
      .setColor('RANDOM')

    message.channel.send(embed);
  }
}
