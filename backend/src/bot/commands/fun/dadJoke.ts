import { Message } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";
import { MemeManager } from "../../../../lib/memes/MemesManager";

export default class extends Command {
  private memeManager: MemeManager;

  public constructor() {
    super({
      name: 'dad-joke',
      args: [],
      aliases: [],
      ownerOnly: true,
      cooldown: 0,
      description: 'Sends a dad joke in the chat, how wounderful!',
      clientPerms: [],
      userPerms: [],
    });

    this.memeManager = new MemeManager();
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    this.memeManager.getDadJokeEmbed(message.author).then(embed => {
      message.channel.send(embed);
    });
  }
}
