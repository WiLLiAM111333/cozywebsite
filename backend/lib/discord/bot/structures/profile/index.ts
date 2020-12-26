import { User } from "discord.js";
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
  public xp: XPManager;
  public economy: EconomyManager;
  public user: User

  public constructor(xp: XPManager, economy: EconomyManager) {
    this.xp = xp;
    this.economy = economy;
  }
}
