import { Router } from '../../../../lib/server/router/Router';
import { DiscordAPIRouter } from './discord/index';
import { AuthRouter } from './website/auth/router';
import { Application, Router as expressRouter } from 'express';

export class APIRouter extends Router {
  public constructor(app: Application) {
    super({
      app,
      route: '/api/v1',
      router: expressRouter()
    });

    const discordRouter = new DiscordAPIRouter(app);
    const authRouter = new AuthRouter(app);

    this.router.use(discordRouter.route, discordRouter.router);
    this.router.use(authRouter.route, authRouter.router);
  }
}
