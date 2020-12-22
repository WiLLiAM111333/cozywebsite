import { Client } from 'discord.js';
import { DiscordRouter } from '../../../../../../lib/discord/router/DiscordRouter';
import { Application, Router as expressRouter } from 'express';
import { GuildController } from './controller';

export class GuildRouter extends DiscordRouter {
  protected controller: GuildController;

  public constructor(app: Application, client: Client) {
    super({
      app,
      client,
      route: '/guilds',
      router: expressRouter(),
      controller: new GuildController()
    });
   
    this.router.get('/', this.controller.getAll());
    this.router.get('/:id', this.controller.getByID());
  }
}
