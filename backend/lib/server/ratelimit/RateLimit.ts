import { Snowflake } from "discord.js";
import { Base } from "../../Base";
import { IRateLimit } from "./IRateLimit";
import { RateLimitConstructor } from "./RateLimitConstructor";

export class RateLimit extends Base implements IRateLimit {
  public discordUserID: Snowflake;
  public websiteUserID: string;
  public requestAmount: number;
  public rateLimitedAt: string;

  public constructor(data: RateLimitConstructor) {
    super();
    
    this.discordUserID = data.discordUserID;
    this.websiteUserID = data.websiteUserID;
    this.requestAmount = data.requestAmount;
    this.rateLimitedAt = new Date().toLocaleString();
  }
}
