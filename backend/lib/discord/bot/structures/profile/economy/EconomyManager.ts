import { GuildMember } from "discord.js";
import { db } from '../../../../../../src/db/index';
import { Constants } from '../../../../../../src/utils/constants';
import { InternalMath } from '../../../../../math/index';
import { EconomyEventHandler } from './EconomyEventHandler';

const { DISCORD_PROFILES } = Constants.TableNames;

export class EconomyManager extends EconomyEventHandler{
  private member: GuildMember;
  private math: InternalMath;

  public constructor(member: GuildMember) {
    super();

    this.member = member;
    this.math = new InternalMath();

    this.attachListeners();
  }

  private attachListeners() {
    this.on('levelUp', (level) => this.addCoins(this.math.random(30, 75)));
    this.on('resetCoins', () => this.resetCoins());
  }

  public async getCoins(): Promise<number> {
    try {
      const coins = (await db.table(DISCORD_PROFILES)
        .select('coins')
        .where('memberID', this.member.id))[0].coins;
      
      return coins;
    } catch (err) {
      this.handleError(err);
    }
  }

  public async addCoins(amount: number): Promise<void> {
    try {
      const coins = await this.getCoins();

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ coins: coins + amount });

    } catch (err) {
      this.handleError(err);
    }
  }

  public async removeCoins(amount: number): Promise<void> {
    try {
      const coins = await this.getCoins();

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ coins: coins - amount });
    } catch (err) {
      this.handleError(err);
    }
  }

  private async resetCoins(): Promise<void> {
    try {
      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ coins: 0 })
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: any): void {
    this.handleError(err);
  }
}
