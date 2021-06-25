import { Application, Router as expressRouter } from "express";
import { Router } from "../../../../../../lib/server/router/Router";
import { RandomAPIController } from "./controller";

export class RandomAPIRouter extends Router {
  declare protected readonly controller: Readonly<RandomAPIController>;
  
  public constructor(app: Application) {
    super({
      app,
      route: '/randomapi',
      router: expressRouter(), 
      controller: new RandomAPIController()
    });

    this.router.get('/', this.controller.getMeme());
  }  
} 
