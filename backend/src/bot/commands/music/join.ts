import { Message } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'join',
      aliases: ['cmere'],
      args: [],
      cooldown: 30,
      description: 'Joins the message author\'s voice channel.',
      ownerOnly: false,
    });
  }

  public async run(client: CozyClient, message: Message, args: Array<string>): Promise<void> {
    await message.member.voice.channel.join();
  }
}
