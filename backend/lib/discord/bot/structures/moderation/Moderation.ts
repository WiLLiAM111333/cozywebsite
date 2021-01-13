import { CozyClient } from "../../client/CozyClient";
import { Constants } from '../../../../../src/utils/constants';
import { 
  DiscordAPIError, 
  DMChannel, 
  GuildMember, 
  MessageEmbed, 
  RoleResolvable, 
  Snowflake, 
  TextChannel, 
} from "discord.js";

const {
  DISCORD_BANS,
  DISCORD_KICKS,
  DISCORD_MUTES,
  DISCORD_WARNS,
  DISCORD_REPORTS
} = Constants.TableNames;

export class Moderation {
  private client: CozyClient;
  private gifBanRole: Snowflake;
  private mutedRole: Snowflake;
  private emoteBanRole: Snowflake;

  public constructor(client: CozyClient) {
    this.client = client;

    this.attachListeners();
  }

  private attachListeners() {
    // The following 2 comments applies to every event with a comment like this inside of them `//l`
    // Check if the logger is supposed to log this
    // Check where and what to log
    // -----------------------------------------------------------------------------------------------

    // Cant use any event from the base client to populate the following tables
    // Create these events and execute them in the commands themselves
    /*
      DISCORD_KICKS
      DISCORD_MUTES
      DISCORD_REPORTS
      DISCORD_WARNS
    */

    this.client.on('guildBanAdd', (guild, user) => {
      // Add to the database if the user doesnt already exist.
      // Check if the user has been unbanned by using the `unbanned` boolean column
      // Re-check that `unbanned` field to false if that user was unbanned previously
    });

    this.client.on('guildBanRemove', (guild, user) => {
      // Soft remove of the ban in the database with a boolean column called `unbanned`
    });

    this.client.on('guildKickAdd', member => {
      // Add to the `DISCORD_KICKS` table
    });
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

  public async ban(member: GuildMember, reason?: string): Promise<void> {
    try {
      await member.ban({ days: 7, reason: reason ? reason : 'No reason set' });
    } catch (err) {
      this.handleError(err);
    }
  }

  public async kick(member: GuildMember, reason?: string): Promise<void> {
    try {
      await member.kick(reason ? reason : 'No reason set');
      this.client.emit('guildKickAdd', member);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async gifBan(member: GuildMember): Promise<void> {
    try {
      await this.addRole(member, member.guild.roles.cache.get(this.gifBanRole));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async unGifBan(member: GuildMember): Promise<void> {
    try {
      await this.removeRole(member, this.gifBanRole);
    } catch (err) {
      this.handleError(err);
    }
  }

  public async emoteBan(member: GuildMember): Promise<void> {
    try {
      await this.addRole(member, member.guild.roles.cache.get(this.emoteBanRole));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async unEmoteBan(member: GuildMember): Promise<void> {
    try {
      await this.removeRole(member, this.emoteBanRole);
    } catch (err) {
      console.log(err);
    }
  }

  public async mute(member: GuildMember): Promise<void> {
    try {
      await this.addRole(member, member.guild.roles.cache.get(this.mutedRole));
    } catch (err) {
      this.handleError(err);
    }
  }

  public async unmute(member: GuildMember): Promise<void> {
    try {
      await this.removeRole(member, this.mutedRole);
    } catch (err) {
      this.handleError(err);
    }
  }

  private async addRole(member: GuildMember, role: RoleResolvable): Promise<void> {
    try {
      const roleToAdd = member.guild.roles.cache.get(typeof role !== 'string' ? role.id : role)
      const hasRole = member.roles.cache.has(roleToAdd.id);
  
      if(!hasRole) {
        await member.roles.add(roleToAdd);
      }
    } catch (err) {
      this.handleError(err)
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
  private handleError<O, K>(err: unknown): void {
    console.log(err);
  }
}
