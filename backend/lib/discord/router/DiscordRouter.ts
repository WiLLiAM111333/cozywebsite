import { Client } from 'discord.js';
import { DiscordController } from '../controller/DiscordController';
import { IRouter } from '../../server/router/IRouter';
import { Router } from '../../server/router/Router';
import { DiscordRouterConstructor } from './DiscordRouterConstructor';

export class DiscordRouter extends Router implements IRouter {
  protected readonly client: Client;
  declare protected readonly controller?: Readonly<DiscordController>;
  
  public constructor(data: DiscordRouterConstructor) {
    super(data);

    this.client = data.client;
  }
}
