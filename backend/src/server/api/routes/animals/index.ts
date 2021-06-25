import { Router } from "../../../../../lib/server/router/Router";
import { DogRouter } from "./dog/router";
import { CatRouter } from "./cat/router";
import { FoxRouter } from './fox/router';
import { KoalaRouter } from "./koala/router";
import { BirdRouter } from "./bird/router";
import { PandaRouter } from './panda/router';
import {
  Application, 
  Router as expressRouter
} from 'express';

export class AnimalRouter extends Router {
  private readonly dogRouter: Readonly<DogRouter>;
  private readonly catRouter: Readonly<CatRouter>;
  private readonly foxRouter: Readonly<FoxRouter>;
  private readonly koalaRouter: Readonly<KoalaRouter>;
  private readonly birdRouter: Readonly<BirdRouter>;
  private readonly pandaRouter: Readonly<PandaRouter>;

  public constructor(app: Application) {
    super({
      app,
      route: '/animals',
      router: expressRouter()
    });

    this.dogRouter = new DogRouter(app);
    this.catRouter = new CatRouter(app);
    this.foxRouter = new FoxRouter(app);
    this.koalaRouter = new KoalaRouter(app);
    this.birdRouter = new BirdRouter(app);
    this.pandaRouter = new PandaRouter(app);

    this.router.use(this.dogRouter.route, this.dogRouter.router);
    this.router.use(this.catRouter.route, this.catRouter.router);
    this.router.use(this.foxRouter.route, this.foxRouter.router);
    this.router.use(this.koalaRouter.route, this.koalaRouter.router);
    this.router.use(this.birdRouter.route, this.birdRouter.router);
    this.router.use(this.pandaRouter.route, this.pandaRouter.router);
  }
}
