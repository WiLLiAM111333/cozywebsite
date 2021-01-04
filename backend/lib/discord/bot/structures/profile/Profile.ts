import { GuildMember, User } from "discord.js";
import { EconomyManager } from "./economy/EconomyManager";
import { XPManager } from "./xp/XPManager";

/*
  This is being differentiated from the websites User class because
  that class is meant to store stuff of value to the OAuth class and not
  of value to the bot or to be used in the message event in any way.

  This class will however be used in the message event every time to update
  the profiles xp and economy.

  Public fields may become private in the future depending on how I go about managing this data
*/

export class Profile {
  public xpManager: XPManager;
  public economyManager: EconomyManager;
  public member: GuildMember

  public constructor(member: GuildMember) {
    this.member = member;
    
    this.xpManager = new XPManager(member);
    this.economyManager = new EconomyManager(member);
  }
}
