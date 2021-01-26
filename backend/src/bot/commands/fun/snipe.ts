import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'snipe',
      args: [],
      aliases: [],
      ownerOnly: false,
      cooldown: 60,
      description: 'Snipes a recently deleted message from the same channel.',
      clientPerms: ['SEND_MESSAGES'],
      userPerms: ['VIEW_CHANNEL']
    });
  }

  public async run(client: CozyClient, message: Message, args: Array<string>): Promise<void> {
    const snipe = client.snipes.get(message.channel.id);

    const embed = new MessageEmbed()
      .setAuthor(`Deleted message from ${snipe.author.tag}`, snipe.author.displayAvatarURL({ dynamic: true }))
      .setDescription(snipe.content)
      .setColor('RANDOM')
      
    message.channel.send(embed);
  }
}
