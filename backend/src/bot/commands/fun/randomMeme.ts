import { Message } from "discord.js";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";
import { MemeManager } from "../../../../lib/memes/MemesManager";

export default class extends Command {
  private memeManager: MemeManager;

  public constructor() {
    super({
      name: 'random-meme',
      args: [],
      aliases: [],
      ownerOnly: true,
      cooldown: 0,
      description: 'Gets a random meme from a random API',
      clientPerms: [],
      userPerms: [],
    });

    this.memeManager = new MemeManager();
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    this.memeManager.randomMemeEmbed(message.author).then(embed => {
      message.channel.send(embed);
    });
  }
}
