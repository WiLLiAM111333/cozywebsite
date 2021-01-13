import { Client } from 'discord.js';
import { DiscordController } from '../controller/DiscordController';
import { IRouter } from '../../server/router/IRouter';
import { Router } from '../../server/router/Router';
import { DiscordRouterConstructor } from './DiscordRouterConstructor';

export class DiscordRouter extends Router implements IRouter {
  protected client: Client;
  protected controller?: DiscordController;
  
  public constructor(data: DiscordRouterConstructor) {
    super(data);

    this.client = data.client;
  }
}
