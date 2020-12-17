import { Snowflake, User } from "discord.js";
import { DiscordController } from "../../../../../../lib/discord/controller/DiscordController";
import { IDiscordController } from "../../../../../../lib/discord/controller/IDiscordController";

export class UserController extends DiscordController implements IDiscordController {
  public constructor() {
    super();
  }

  public getByID(id: Snowflake): User {
    return this.client.users.cache.get(id);
  }

  public getAll(): Array<User> {
    return this.client.users.cache.array();
  }
}
