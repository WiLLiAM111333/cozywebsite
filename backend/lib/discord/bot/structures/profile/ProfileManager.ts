import { Snowflake, GuildMember, Message } from "discord.js";
import { db } from '../../../../../src/db/index';
import { Constants } from '../../../../../src/utils/constants';
import { Profile } from "./Profile";

const { DISCORD_PROFILES } = Constants.TableNames;

export class ProfileManager {
  private async hasProfile(id: Snowflake): Promise<boolean> {
    return (await db.table(DISCORD_PROFILES)
      .select('*')
      .where('memberID', id))
      .length > 0;
  }

  private async createProfile(member: GuildMember): Promise<Profile> {
    const hasProfile = await this.hasProfile(member.id);

    if(!hasProfile) {
      await db.table(DISCORD_PROFILES).insert({
        memberID: member.id,
        coins: 0,
        xp: 0,
        level: 1
      });
    }
 
    return new Profile(member);
  }

  public async handleMessage(message: Message): Promise<void> {
    try {
      const member = message.member;
      
      const profile = await this.createProfile(member);

      const xp = Math.floor(Math.random() * 50) + 10;
      const coins = Math.floor(Math.random() * 20) + 25;
      
      await profile.xpManager.addXP(xp);
      await profile.economyManager.addCoins(coins);

      // console.log(message.author.tag);
      // console.log(`XP: ${await profile.xpManager.getXP()}`);
      // console.log(`Level: ${await profile.xpManager.getLevel()}`);
      // console.log(`Coins: ${await profile.economyManager.getCoins()}\n---\n`);
    } catch(err) {
      console.log(err);
    }
  }
}
