import { Message } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  public constructor() {
    super({
      name: 'leave',
      aliases: ['disconnect'],
      args: [],
      cooldown: 30,
      description: 'leaves the current voice channel.',
      ownerOnly: false,
    });
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    const memberChannel = message.member.voice.channel;
    const clientChannel =  message.guild.me.voice.channel;

    if(memberChannel.id === clientChannel.id) {
      clientChannel.leave();
    } else {
      message.reply('error message later')
    }
  }
}
