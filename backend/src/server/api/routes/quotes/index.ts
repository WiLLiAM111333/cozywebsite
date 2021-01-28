import { Router } from "../../../../../lib/server/router/Router";
import { Application, Router as expressRouter } from "express";
import { KanyeRouter } from "./kanye/router";
import { QuotableRouter } from "./quotable/router";

export class QuoteRouter extends Router {
  private quotableAPIRouter: QuotableRouter;
  private kanyeRouter: KanyeRouter;

  public constructor(app: Application) {
    super({
      app,
      route: '/quotes',
      router: expressRouter(),
    });

    this.kanyeRouter = new KanyeRouter(app);
    this.quotableAPIRouter = new QuotableRouter(app);

    this.router.use(this.kanyeRouter.route, this.kanyeRouter.router)
    this.router.use(this.quotableAPIRouter.route, this.quotableAPIRouter.router);
  }
}
