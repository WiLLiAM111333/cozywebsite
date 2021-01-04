import { GuildMember } from "discord.js";
import { db } from '../../../../../../src/db/index';
import { Constants } from '../../../../../../src/utils/constants';

const { DISCORD_PROFILES } = Constants.TableNames;

export class EconomyManager {
  private member: GuildMember;

  public constructor(member: GuildMember) {
    this.member = member;
  }

  public async getCoins(): Promise<number> {
    try {
      const coins = (await db.table(DISCORD_PROFILES)
        .select('coins')
        .where('memberID', this.member.id))[0].coins;
      
      return coins;
    } catch (err) {
      console.log(err);
    }
  }

  public async addCoins(amount: number): Promise<void> {
    try {
      const coins = await this.getCoins();

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ coins: coins + amount });
    } catch (err) {
      console.log(err);
    }
  }

  public async removeCoins(amount: number): Promise<void> {
    try {
      const coins = await this.getCoins();

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ coins: coins - amount });
    } catch (err) {
      console.log(err);
    }
  }
}
