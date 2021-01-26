import { Router } from '../../../../lib/server/router/Router';
import { DiscordAPIRouter } from './discord/index';
import { AuthRouter } from './website/auth/router';
import { Application, Router as expressRouter } from 'express';
import { AnimalRouter } from './animals';

export class APIRouter extends Router {
  private discordRouter: DiscordAPIRouter;
  private authRouter: AuthRouter;
  private animalRouter: AnimalRouter; 

  public constructor(app: Application) {
    super({
      app,
      route: '/api/v1',
      router: expressRouter()
    });

    this.discordRouter = new DiscordAPIRouter(app);
    this.authRouter = new AuthRouter(app);
    this.animalRouter = new AnimalRouter(app);

    this.router.use(this.discordRouter.route, this.discordRouter.router);
    this.router.use(this.authRouter.route, this.authRouter.router);
    this.router.use(this.animalRouter.route, this.animalRouter.router);
  }
}
