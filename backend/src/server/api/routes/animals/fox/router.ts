import { Application, Router as expressRouter } from 'express';
import { FoxController } from './controller';
import { Router } from '../../../../../../lib/server/router/Router';

export class FoxRouter extends Router {
  declare protected readonly controller: Readonly<FoxController>;

  public constructor(app: Application) {
    super({
      app,
      route: '/fox',
      router: expressRouter(),
      controller: new FoxController()
    });

    this.router.get('/', this.controller.getData());
    this.router.get('/fact', this.controller.getFact());
    this.router.get('/image', this.controller.getImage());
  }
}
