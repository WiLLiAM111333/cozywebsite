import { CozyClient } from "../../client/CozyClient";
import { GuildMember, Snowflake } from "discord.js";
import { Constants } from '../../../../../src/utils/constants';

const {
  DISCORD_BANS,
  DISCORD_KICKS,
  DISCORD_MUTES,
  DISCORD_WARNS,
  DISCORD_REPORTS
} = Constants.TableNames;

/*
  I will start creating the DiscordBanManager, DiscordKickManager etc classes in the lib folder before I keep 
  working on this as it needs these classes to manage the tables properly
*/

// Wont keep working on this until the Manager classes for all the moderation is done
export class Moderation {
  private client: CozyClient;
  private gifBanRole: Snowflake;
  private muteRole: Snowflake;
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

  public ban(member: GuildMember, reason?: string): void {
    member.ban({ days: 7, reason: reason ? reason : 'No reason set' });
  }

  public kick(member: GuildMember, reason?: string): void {
    member.kick(reason ? reason : 'No reason set');
    this.client.emit('guildKickAdd', member);
  }

  public gifBan(member: GuildMember): void {
    const role = member.guild.roles.cache.get(this.gifBanRole);
    const hasRole = member.roles.cache.has(this.gifBanRole);

    if(!hasRole) {
      member.roles.add(role);
    }
  }
}
