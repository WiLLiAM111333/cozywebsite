import { Message, MessageEmbed } from "discord.js";
import { Coinflip } from "../../../../lib/games/coinflip";
import { CozyClient } from "../../../../lib/discord/bot/client/CozyClient";
import { Command } from "../../../../lib/discord/bot/structures/command/Command";

export default class extends Command {
  private coinflip: Coinflip;

  public constructor() {
    super({
      name: 'test',
      args: [],
      aliases: [],
      ownerOnly: true,
      cooldown: 0,
      description: 'For development purposes',
      clientPerms: [],
      userPerms: [],
    });

    this.coinflip = new Coinflip();
  }

  public run(client: CozyClient, message: Message, args: Array<string>): void {
    this.coinflip.play(message);
  }
}
