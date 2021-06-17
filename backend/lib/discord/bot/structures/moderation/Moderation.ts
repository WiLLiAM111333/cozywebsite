import { CozyClient } from "../../client/CozyClient";
import { ModerationEventHandler } from './events/ModerationEventHandler';
import { ModerationConfig } from './config/ModerationConfig';
import { v4 as uuidv4 } from 'uuid';
import { 
  DMChannel, 
  GuildMember, 
  MessageEmbed, 
  RoleResolvable, 
  TextChannel, 
} from "discord.js";

import { 
  DiscordBanManager,
  DiscordKickManager, 
  DiscordMuteManager, 
  DiscordReportManager, 
  DiscordWarningManager,
  DiscordGifBanManager,
  DiscordEmoteBanManager
} from '../../../managers';

/**
 * ### TODO
 * * ID Parameters for the guild<ModerationAction>Remove events (e.g guildMuteRemove)
 * @description Class to handle everything to do with moderation
 * @exports
 * @class
 */
export class Moderation {
  public eventHandler: ModerationEventHandler
  private client: CozyClient;
  private config: ModerationConfig;
  private banManager: DiscordBanManager;
  private kickManager: DiscordKickManager;
  private muteManager: DiscordMuteManager;
  private reportManager: DiscordReportManager;
  private warningManager: DiscordWarningManager;
  private gifBanManager: DiscordGifBanManager;
  private emoteBanManager: DiscordEmoteBanManager;
  private ignoreLog: boolean;

  public constructor(client: CozyClient) {
    this.client = client;
    
    this.eventHandler = new ModerationEventHandler();

    this.banManager = new DiscordBanManager();
    this.kickManager = new DiscordKickManager();
    this.muteManager = new DiscordMuteManager();
    this.reportManager = new DiscordReportManager();
    this.warningManager = new DiscordWarningManager();
    this.gifBanManager = new DiscordGifBanManager();
    this.emoteBanManager = new DiscordEmoteBanManager();
    this.ignoreLog = false;

    this.attachListeners();
  }

  private attachListeners(): void {
    this.eventHandler.on('configCreate', config => this.config = config);
    this.eventHandler.on('configUpdate', config => this.config = config);

    this.client.on('guildBanAdd', async (guild, user) => {
      try {
        const userID = user.id;
        const guildID = guild.id;
  
        const hasBan = await this.banManager.has({ userID, guildID })
  
        if(!hasBan) {
          await this.banManager.add({
            banID: uuidv4(),
            bannedAt: Date.now(),
            guildID,
            userID,
            reason: 'UNKNOWN_REASON',
            unbanned: false
          });

          if(this.ignoreLog) {
            this.ignoreLog = false;
          } else {
            this.client.logger.moderationLog('BAN', userID);
          }
        } 
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildBanRemove', async (guild, user) => {
      try {
        const userID = user.id;
        const guildID = guild.id;

        const hasBan = await this.banManager.has({ userID, guildID });

        if(hasBan) {
          await this.banManager.update({ userID, guildID }, { unbanned: true });
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildKickAdd', async member => {
      try {
        const userID = member.id;
        const guildID = member.guild.id;

        const hasKick = await this.kickManager.has({ userID, guildID });

        if(!hasKick) {
          await this.kickManager.add({
            guildID,
            userID,
            kickID: uuidv4(),
            kickedAt: Date.now(),
            reason: 'UNKNOWN_REASON'
          });

          if(this.ignoreLog) {
            this.ignoreLog = false;
          } else {
            this.client.logger.moderationLog('KICK', userID);
          }
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildMuteAdd', async (member, rawReason) => {
      try {
        const reason = rawReason ?? 'UNKNOWN_REASON';
        const userID = member.id;
        const guildID = member.guild.id;

        const hasMute = await this.muteManager.has({ userID, guildID });

        if(!hasMute) {
          await this.muteManager.add({
            muteID: uuidv4(),
            mutedAt: Date.now(),
            guildID,
            userID,
            reason
          });

          if(this.ignoreLog) {
            this.ignoreLog = false;
          } else {
            this.client.logger.moderationLog('MUTE', userID, reason);
          }
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildMuteRemove', async member => {
      try {
        const userID = member.id;
        const guildID = member.guild.id;

        const hasMute = await this.muteManager.has({ userID, guildID });

        if(hasMute) {
          await this.muteManager.delete({ userID, guildID });
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildReportAdd', async (member, reporter, rawReason) => {
      try {
        const reason = rawReason ?? 'UNKNOWN_REASON';
        const userID = member.id;
        const reporterID = reporter.id;
        const guildID = member.guild.id;
        
        await this.reportManager.add({
          reportID: uuidv4(),
          reportedAt: Date.now(),
          reporterID,
          reason,
          userID,
          guildID
        });

        if(this.ignoreLog) {
          this.ignoreLog = false;
        } else {
          this.client.logger.moderationLog('REPORT', userID, reason);
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildReportRemove', async member => {
      try {
        const userID = member.id;
        const guildID = member.guild.id;
        
        const hasReport = await this.reportManager.has({ userID, guildID });
        
        if(hasReport) {
          await this.reportManager.delete({ userID, guildID });
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildWarnAdd', async (member, rawReason) => {
      try {
        const reason = rawReason ?? 'UNKNOWN_REASON';
        const userID = member.id;
        const guildID = member.guild.id;

        await this.warningManager.add({
          warnID: uuidv4(),
          warnedAt: Date.now(),
          guildID,
          userID,
          reason
        });

        if(this.ignoreLog) {
          this.ignoreLog = false;
        } else {
          this.client.logger.moderationLog('WARN', userID, reason);
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildWarnRemove', async member => {
      try {
        const userID = member.id;
        const guildID = member.guild.id;

        const hasWarning = await this.warningManager.has({ userID, guildID });

        if(hasWarning) {
          await this.warningManager.delete({ userID, guildID });
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildGifBanAdd', async (member, rawReason) => {
      try {
        const reason = rawReason ?? 'UNKNOWN_REASON';
        const userID = member.id;
        const guildID = member.guild.id;

        // Check if member has gifban role
        await this.gifBanManager.add({
          gifBanID: uuidv4(),
          gifbannedAt: Date.now(),
          guildID,
          userID,
          reason
        });

        if(this.ignoreLog) {
          this.ignoreLog = false;
        } else {
          this.client.logger.moderationLog('GIFBAN', userID, reason);
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildGifBanRemove', async member => {
      try {
        const userID = member.id;
        const guildID = member.guild.id;
        
        const hasGifBan = await this.gifBanManager.has({ userID, guildID });
        
        if(hasGifBan) {
          await this.gifBanManager.delete({ userID, guildID });
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildEmoteBanAdd', async (member, rawReason) => {
      try {
        const reason = rawReason ?? 'UNKNOWN_REASON';
        const userID = member.id;
        const guildID = member.guild.id;
        
        // Check if member has emoteban role
        await this.emoteBanManager.add({
          emoteBanID: uuidv4(),
          emoteBannedAt: Date.now(),
          guildID,
          userID,
          reason
        });

        if(this.ignoreLog) {
          this.ignoreLog = false;
        } else {
          this.client.logger.moderationLog('BAN', userID, reason);
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

    this.client.on('guildEmoteBanRemove', async member => {
      try {
        const userID = member.id;
        const guildID = member.guild.id;
        
        const hasEmoteBan = await this.emoteBanManager.has({ userID, guildID });
        
        if(hasEmoteBan) {
          await this.emoteBanManager.delete({ userID, guildID });
        }
      } catch (err) {
        // TODO: Handle error
        console.error(err);
      }
    });

  }

  private initConfig(): void {
    if(this.config) {
      
    }
  }

  // Not sure what to think of this so far, might change in the future
  public async notifyMember(member: GuildMember, msg: string): Promise<void> {
    let channel: DMChannel | TextChannel;
  
    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true || false }))
      .setDescription(`Hello, ${member.user.username}! I have been tasked with sending you this message:\n${msg}`)
      .setColor('#00d111')
      .setThumbnail(member.guild.iconURL({ dynamic: true || false }))
  
    try {
      channel = await member.createDM(true);
      await channel.send(embed)
    } catch (err) {
      if(err.code === 50007) {
        try {
          channel = member.guild.systemChannel;
          await channel.send(member.user.toString(), { embed });
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    }
  }

  public async ban(member: GuildMember, rawReason?: string): Promise<GuildMember> {
    try {
      const reason = rawReason ?? 'No reason set';

      this.client.logger.moderationLog('BAN', member.id, reason);
      this.ignoreLog = true;

      // Dont emit event as base client already gets it from the discord gateway

      return await member.ban({ days: 7, reason });
    } catch (err) {
      this.handleError(err);
    }
  }

  public async kick(member: GuildMember, rawReason?: string): Promise<GuildMember> {
    try {
      const reason = rawReason ?? 'No reason set';
      const returnMember = await member.kick(reason);

      this.client.logger.moderationLog('KICK', member.id, reason);
      this.ignoreLog = true;

      this.client.emit('guildKickAdd', member, reason);

      return returnMember;
    } catch (err) {
      this.handleError(err);
    }
  }

  public async gifBan(member: GuildMember, rawReason?: string): Promise<void> {
    try {
      const reason = rawReason ?? 'No reason set';

      await this.addRole(member, member.guild.roles.cache.get(this.config.gifBanRole));
      
      this.client.logger.moderationLog('GIFBAN', member.id, reason);
      this.ignoreLog = true;

      this.client.emit('guildGifBanAdd', member, reason)
    } catch (err) {
      this.handleError(err);
    }
  }

  public async unGifBan(member: GuildMember): Promise<void> {
    try {
      await this.removeRole(member, this.config.gifBanRole);

      this.client.emit('guildGifBanRemove', member);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async emoteBan(member: GuildMember, rawReason?: string): Promise<void> {
    try {
      const reason = rawReason ?? 'No reason set';
      
      await this.addRole(member, member.guild.roles.cache.get(this.config.emoteBanRole));
      
      this.client.logger.moderationLog('EXTERNALEMOTEBAN', member.id, reason);
      this.ignoreLog = true;

      this.client.emit('guildEmoteBanAdd', member, reason);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async unEmoteBan(member: GuildMember): Promise<void> {
    try {
      await this.removeRole(member, this.config.emoteBanRole);
      
      this.client.emit('guildEmoteBanRemove', member);
    } catch (err) {
      console.log(err);
    }
  }

  public async mute(member: GuildMember, rawReason?: string): Promise<void> {
    try {
      const reason = rawReason ?? 'No reason set';

      await this.addRole(member, member.guild.roles.cache.get(this.config.mutedRole));

      this.client.logger.moderationLog('MUTE', member.id, reason);
      this.ignoreLog = true;

      this.client.emit('guildMuteAdd', member, reason);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async unmute(member: GuildMember): Promise<void> {
    try {
      await this.removeRole(member, this.config.mutedRole);

      this.client.emit('guildMuteRemove', member);
    } catch (err) {
      this.handleError(err);
    }
  }

  private async addRole(member: GuildMember, role: RoleResolvable): Promise<void> {
    try {
      const roleToAdd = member.guild.roles.cache.get(typeof role !== 'string' ? role.id : role);
      const hasRole = member.roles.cache.has(roleToAdd.id);
  
      if(!hasRole) {
        await member.roles.add(roleToAdd);
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private async removeRole(member: GuildMember, role: RoleResolvable): Promise<void> {
    try {
      const roleToRemove = member.guild.roles.cache.get(typeof role !== 'string' ? role.id : role);
      const hasRole = member.roles.cache.has(roleToRemove.id);
      
      if(hasRole) {
        await member.roles.remove(roleToRemove);
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  // O = Object of error type
  // K = Key / Subtype of error
  // Later
  private handleError<O, K>(err: unknown): void {
    console.log(err);
  }
}
