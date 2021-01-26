import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'owner',
      aliases: [],
      args: [],
      cooldown: 30,
      description: 'Sends an embed with the servers owner',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const owner = message.guild.owner;
    
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${owner.user.tag} is the owner of ${message.guild.name}`, owner.user.avatarURL({ dynamic: true }))
      .setImage(owner.user.avatarURL({ dynamic: true, size: 2048 })) 

    message.channel.send(embed);
  }
}
