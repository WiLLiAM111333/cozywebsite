import { Application, Router as expressRouter } from 'express';
import { PandaController } from './controller';
import { Router } from '../../../../../../lib/server/router/Router';

export class PandaRouter extends Router {
  protected controller: PandaController;

  public constructor(app: Application) {
    super({
      app,
      route: '/panda',
      router: expressRouter(),
      controller: new PandaController()
    });

    this.router.get('/', this.controller.getData());
    this.router.get('/fact', this.controller.getFact());
    this.router.get('/image', this.controller.getImage());
  }
}
