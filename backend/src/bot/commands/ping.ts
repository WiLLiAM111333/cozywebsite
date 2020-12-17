import { Message } from "discord.js";
import { CozyClient } from "../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../lib/discord/bot/structures/command/Command";

export class Ping extends Command {
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
    console.log(message.channel.send(client.ws.ping));
  }
}
