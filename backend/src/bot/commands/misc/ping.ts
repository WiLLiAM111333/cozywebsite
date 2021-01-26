import { Message, MessageEmbed } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'ping',
      args: [],
      aliases: ['latency'],
      ownerOnly: false,
      cooldown: 0,
      description: 'Checks the ping to the Discord gateway',
      clientPerms: ['SEND_MESSAGES'],
      userPerms: ['VIEW_CHANNEL']
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const ping = client.ws.ping;

    const embed = new MessageEmbed()
      .setColor(
        ping < 200 
          ? ping < 100
            ? '#00e038'
            : '#e06c00'
          : '#f00000'
      )
      .setDescription(`Ping to the Discord Gateway: **${ping}** 🚀`)

    message.channel.send(embed);
  }
}
