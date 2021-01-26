import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'edit-snipe',
      args: [],
      aliases: ['snipe-edit', 'snipe-edits', 'snipeedits', 'editsnipe', 'editsnipes'],
      ownerOnly: false,
      cooldown: 60,
      description: 'Snipes edited message for their original content.',
      clientPerms: ['SEND_MESSAGES'],
      userPerms: ['VIEW_CHANNEL']
    });
  }

  public async run(client: CozyClient, message: Message, args: Array<string>): Promise<void> {
    const editSnipe = client.editSnipes.get(message.channel.id);

    const editsEmbed = new MessageEmbed()
      .setTitle(`Edit Sniped!`)
      .setColor('RANDOM')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true || false }))
      .addFields(
        {
          name: 'Original Message Content:',
          value: editSnipe.oldContent,
          inline: false
        },
        {
          name: 'Edited Message Content:',
          value: editSnipe.newContent,
          inline: false
        },
      )
      
    message.channel.send(editsEmbed);
  }
}
