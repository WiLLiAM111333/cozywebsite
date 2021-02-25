/*






WORK IN PROGRESS







*/

import Knex from "knex";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { join } from "path";
import { db } from "../../../src/db";
import { CoinflipUser } from "./CoinflipUser";
import stripIndent from "strip-indent";

export class Coinflip {
  private db: Knex;

  public constructor() {
    this.db = db;
  }

  public flipCoin(): CoinSide {
    return Math.floor(Math.random() * 2)
      ? 'heads'
      : 'tails';
  }

  public getImageEmbed(side: CoinSide): MessageEmbed {
    const imgPath = join(__dirname, '..', '..', '..', 'assets', `${side}.png`);

    const embed = new MessageEmbed()
      .attachFiles([ imgPath ])
      .setImage(`attachment://${side}.png`)

    return embed;
  }

  public async play(message: Message): Promise<void> {
    try {
      const user = await this.getUser(message.author.id);
      const avatarURL = message.author.avatarURL({ dynamic: true });

      const guess = message.content.split(/ +/)[1];
      const side = this.flipCoin();
      const didWin = guess === side;

      const embed = new MessageEmbed(this.getImageEmbed(side))
        .setColor('#ffbd24')
        .setAuthor(
          `${message.author.tag} guessed ${guess} and ${didWin ? 'won' : 'lost'}!`,
          avatarURL
        )

      try {
        if(didWin) {
          await this.handleWin(user);
        } else {
          await this.handleLoss(user);
        }
      } finally {
        embed.setDescription(stripIndent(`
          **Wins**: \`${user.wins}\`
          **Losses**: \`${user.losses}\`
          **Winrate**: \`${user.winrate}\`
        `))
  
        await message.channel.send(embed);
      }

    } catch (err) {
      console.error(err);
    }
  }

  private async handleWin(user: CoinflipUser): Promise<void> {
    try {
      const wins = user.wins++;
      const totalGames = user.totalGames++;
      const winrate = user.winrate = this.getWinRatio(user);

      await this.updateUser(user, { wins, totalGames, winrate });
    } catch (err) {
      console.error(err);
    }
  }

  private async handleLoss(user: CoinflipUser): Promise<void> {
    try {
      const losses = user.losses++;
      const totalGames = user.totalGames++;
      const winrate = user.winrate = this.getWinRatio(user);

      await this.updateUser(user, { losses, totalGames, winrate });
    } catch (err) {
      console.error(err);
    }
  }
  
  private getWinRatio({ wins, losses }: { wins: number, losses: number }): string {
    if(wins === 0 && losses === 0) {
      return '0'
    } else if(wins === 1 && losses === 0) {
      return '100%'
    } else {
      return `${((wins * 100) / (wins + losses)).toFixed(2)}%`
    }
  }

  private async getUser(id: string): Promise<CoinflipUser | undefined> {
    try {
      const userData = (
        await this.db.table('coinflip_users').where({ id: id })
      ).reduce((obj, value) => Object.assign(obj, value), {});

      if(!userData || !('id' in userData)) {
        return new CoinflipUser(await this.createUser(id));
      }

      return new CoinflipUser(userData);
    } catch (err) {
      console.error(err);
    }
  }

  private async createUser(id: string): Promise<CoinflipUser> {
    try {
      await this.db.table('coinflip_users').insert({
        id,
        wins: 0,
        losses: 0,
        totalGames: 0,
        winrate: '0%'
      });
  
      return new CoinflipUser({
        id,
        wins: 0,
        losses: 0,
        totalGames: 0,
        winrate: '0%'
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async updateUser({ id }: { id: string }, data: Optional<CoinflipUser>): Promise<void> {
    try {
       await this.db.table('coinflip_users')
        .where({ id })
        .update(data);
    } catch (err) {
      console.error(err);
    }
  }
}
