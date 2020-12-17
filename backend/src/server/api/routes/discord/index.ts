import { Router } from '../../../../../lib/router/Router';
import { Application, Router as expressRouter } from 'express';
import { UserRouter } from './user/router';
import { GuildRouter } from './guild/router';
import { client } from '../../../../bot/index';

export class DiscordAPIRouter extends Router {
  public constructor(app: Application) {
    super({
      app,
      route: '/discord',
      router: expressRouter(),
    });

    const userRouter = new UserRouter(app, client);
    const guildRouter = new GuildRouter(app, client);

    this.router.use(userRouter.route, userRouter.router);
    this.router.use(guildRouter.route, guildRouter.router);
  }
}
