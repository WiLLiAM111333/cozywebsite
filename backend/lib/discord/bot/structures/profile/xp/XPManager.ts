import { db } from '../../../../../../src/db/index';
import { Constants } from '../../../../../../src/utils/constants';
import { GuildMember } from "discord.js";
import { XPEventHandler } from './XPEventHandler';

const {
  DISCORD_PROFILES,
  LEVEL_REWARDS
} = Constants.TableNames;

export class XPManager extends XPEventHandler {
  private member: GuildMember;

  public constructor(member: GuildMember) {
    super();

    this.member = member;

    // This might end up with 1 more db call than necessary, will work on this at some point
    this.on('resetLevel', () => this.resetXP());
    this.on('resetXP', () => this.resetLevels());
    
    this.on('levelUp', (_, level) => {
      this.giveLevelReward(level);
    });
  }

  public async getLevel(): Promise<number> {
    try {
      return (await db.table(DISCORD_PROFILES)
        .select('level')
        .where('memberID', this.member.id))[0].level;
    } catch (err) {
      console.log(err);
    }
  }

  public async getXP(): Promise<number> {
    try {
      return (await db.table(DISCORD_PROFILES)
        .select('xp')
        .where('memberID', this.member.id))[0].xp;
    } catch (err) {
      console.log(err);
    }
  }

  public async addXP(amount: number): Promise<void> {
    try {
      const existingXP = await this.getXP();
      const neededXP = await this.getNeededXP();

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ xp: existingXP + amount });

      if((existingXP + amount) >= neededXP) {
        await this.incrementLevel();
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async removeXP(amount: number): Promise<void> {
    try {
      const existingXP = await this.getXP();

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ xp: existingXP - amount });
      
    } catch (err) {
      console.log(err);
    }
  }

  public async incrementLevel(): Promise<void> {
    try {
      const existingLevel = await this.getLevel();
      const newLevel = existingLevel + 1;

      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ level: newLevel });
    
      this.emit('levelUp', this.member.id, newLevel);
    } catch (err) {
      console.log(err);
    }
  }

  public async decrementLevel(): Promise<void> {
    try {
      const existingLevel = await this.getLevel();
      const newLevel = existingLevel - 1;
      
      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ level: newLevel });
      
      this.emit('levelDown', this.member.id, newLevel);
    } catch (err) {
      console.log(err);
    }
  }

  public async addLevels(amount: number): Promise<void> {
    try {
      const existingLevel = await this.getLevel();
      
      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ level: existingLevel + amount });
      
      this.emit('levelUp', this.member.id, existingLevel + amount);
    } catch (err) {
      console.log(err);
    }
  }

  public async removeLevels(amount: number): Promise<void> {
    try {
      const existingLevel = await this.getLevel();
      
      await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id)
        .update({ level: existingLevel - amount });
      
      this.emit('levelDown', this.member.id, existingLevel - amount);
    } catch (err) {
      console.log(err);
    }
  }

  public async resetXP(): Promise<void> {
    try {
      const hasXP = (await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id))
        .length > 0
      
      if(hasXP) {
        await db.table(DISCORD_PROFILES)
          .where('memberID', this.member.id)
          .update({ xp: 0 });
        
        this.emit('resetXP', this.member.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async resetLevels(): Promise<void> {
    try {
      const hasProfile = (await db.table(DISCORD_PROFILES)
        .where('memberID', this.member.id))
        .length > 0

      if(hasProfile) {
        await db.table(DISCORD_PROFILES)
          .where('memberID', this.member.id)
          .update({ level: 1 });

        this.emit('resetLevel', this.member.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private async getNeededXP() {
    try {
      const level = await this.getLevel();
      const lvl = (level ** 3) * 15;

      return Math.round(lvl);
    } catch (err) {
      console.log(err);
    }
  }

  private async hasLevelReward(level: number): Promise<boolean> {
    try {
      return (await db.table(LEVEL_REWARDS)
        .where({ memberID: this.member.id, requiredLevel: level }))
        .length > 0;
    } catch (err) {
      console.log(err);
    }
  }

  // Currently only supports roles
  // Make it check for the correct reward, cause it currently gives all rewards (easy)
  private async giveLevelReward(level: number): Promise<void> {
    try {
      const hasLevelReward = await this.hasLevelReward(level);

      if(hasLevelReward) {
        const rewards = (await db.table(LEVEL_REWARDS)
          .where('memberID', this.member.id))
          .map(data => ({ type: data.type, key: data.key }));

        for(const reward of rewards) {
          if(reward.type === 'role') {
            const role = this.member.guild.roles.cache.get(reward.key);

            if(role) {
              this.member.roles.add(role);
              this.emit('levelRewardGiven', this.member.id, role.name);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
