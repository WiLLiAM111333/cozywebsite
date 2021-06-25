import { Client } from 'discord.js';
import { DiscordRouter } from '../../../../../../../lib/discord/router/DiscordRouter';
import { Application, Router as expressRouter } from 'express';
import { GuildChannelController } from './controller';

export class GuildChannelRouter extends DiscordRouter {
  declare protected readonly controller: Readonly<GuildChannelController>;

  public constructor(app: Application, client: Client) {
    super({
      app,
      client,
      route: '/channels',
      router: expressRouter(),
      controller: new GuildChannelController()
    });
   
    this.router.get('/', this.controller.listChannelIDs());
    this.router.get('/:id', this.controller.getByID());
  }
}
