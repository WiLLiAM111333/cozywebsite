import { Application, Router as expressRouter } from 'express';
import { CatController } from './controller';
import { Router } from '../../../../../../lib/server/router/Router';

export class CatRouter extends Router {
  declare protected readonly controller: Readonly<CatController>;

  public constructor(app: Application) {
    super({
      app,
      route: '/cat',
      router: expressRouter(),
      controller: new CatController()
    });

    this.router.get('/', this.controller.getData());
    this.router.get('/fact', this.controller.getFact());
    this.router.get('/image', this.controller.getImage());
  }
}
