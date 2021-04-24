import { Controller } from "../../server/controller/Controller";
import { client } from '../../../src/bot';
import { CozyClient } from "../bot/client/CozyClient";
import { Snowflake } from "discord.js";

export abstract class DiscordController extends Controller {
  protected client: CozyClient;

  public constructor() {
    super();

    this.client = client;
  }

  protected verifySnowflake(...snowflakes: Array<Snowflake>): boolean {
    const regex = /\d{10,30}/;
    
    for(const snowflake of snowflakes) {
      if(!regex.test(snowflake)) {
        return false;
      }
    }

    return true;
  }
}
