import { Application, Router as expressRouter } from 'express';
import { DogController } from './controller';
import { Router } from '../../../../../../lib/server/router/Router';

export class DogRouter extends Router {
  declare protected controller: DogController;

  public constructor(app: Application) {
    super({
      app,
      route: '/dog',
      router: expressRouter(),
      controller: new DogController()
    });

    this.router.get('/', this.controller.getData());
    this.router.get('/fact', this.controller.getFact());
    this.router.get('/image', this.controller.getImage());
  }
}
