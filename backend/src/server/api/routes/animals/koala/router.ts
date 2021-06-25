import { Application, Router as expressRouter } from 'express';
import { KoalaController } from './controller';
import { Router } from '../../../../../../lib/server/router/Router';

export class KoalaRouter extends Router {
  declare protected readonly controller: Readonly<KoalaController>;

  public constructor(app: Application) {
    super({
      app,
      route: '/koala',
      router: expressRouter(),
      controller: new KoalaController()
    });

    this.router.get('/', this.controller.getData());
    this.router.get('/fact', this.controller.getFact());
    this.router.get('/image', this.controller.getImage());
  }
}
