import { Router } from "../../../../../../lib/server/router/Router";
import { KanyeController } from './controller';
import { Application, Router as expressRouter } from "express";

export class KanyeRouter extends Router {
  protected controller: KanyeController;

  public constructor(app: Application) {
    super({
      app,
      route: '/kanye',
      router: expressRouter(),
      controller: new KanyeController()
    });

    this.router.get('/', this.controller.getKanyeQuote());
  }
}
