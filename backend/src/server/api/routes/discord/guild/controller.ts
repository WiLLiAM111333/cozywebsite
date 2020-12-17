import { Guild, Snowflake } from 'discord.js';
import { DiscordController } from '../../../../../../lib/discord/controller/DiscordController';
import { IDiscordController } from '../../../../../../lib/discord/controller/IDiscordController';

export class GuildController extends DiscordController implements IDiscordController {
  public getAll(): Array<Guild> {
    return this.client.guilds.cache.array();
  }

  public getByID(id: Snowflake): Guild {
    return this.client.guilds.cache.get(id);
  }
}
