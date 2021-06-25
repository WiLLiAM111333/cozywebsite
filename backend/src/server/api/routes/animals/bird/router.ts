import { Application, Router as expressRouter } from 'express';
import { BirdController } from './controller';
import { Router } from '../../../../../../lib/server/router/Router';

export class BirdRouter extends Router {
  declare protected readonly controller: Readonly<BirdController>;

  public constructor(app: Application) {
    super({
      app,
      route: '/bird',
      router: expressRouter(),
      controller: new BirdController()
    });

    this.router.get('/', this.controller.getData());
    this.router.get('/fact', this.controller.getFact());
    this.router.get('/image', this.controller.getImage());
  }
}
