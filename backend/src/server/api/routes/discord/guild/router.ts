import { Client } from 'discord.js';
import { DiscordRouter } from '../../../../../../lib/discord/router/DiscordRouter';
import { Application, Router as expressRouter } from 'express';
import { GuildController } from './controller';
import { GuildChannelRouter } from './channels/router';

export class GuildRouter extends DiscordRouter {
  declare protected readonly controller: Readonly<GuildController>;
  private readonly channelRouter: Readonly<GuildChannelRouter>;

  public constructor(app: Application, client: Client) {
    super({
      app,
      client,
      route: '/guilds',
      router: expressRouter(),
      controller: new GuildController()
    });
  
    this.channelRouter = new GuildChannelRouter(app, client);

    this.router.get('/', this.controller.getAll());
    this.router.get('/:id', this.controller.getByID());
    this.router.get('/:id/banner/:format?/:size?', this.controller.getBanner());
    this.router.use('/:id/channels', this.channelRouter.router);
    this.router.get('/:id/emotes', this.controller.getAllChannels());
  }
}
