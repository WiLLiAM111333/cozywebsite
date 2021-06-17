import { Router } from "../../../../../../lib/server/router/Router";
import { QuotableController } from './controller';
import { Application, Router as expressRouter } from "express";

export class QuotableRouter extends Router {
  declare protected controller: QuotableController;

  public constructor(app: Application) {
    super({
      app,
      route: '/quotable',
      router: expressRouter(),
      controller: new QuotableController()
    });

    this.router.get('/', this.controller.getRandomQuote());
    this.router.get('/:id', this.controller.getQuoteByID());
    this.router.get('/authors', this.controller.listAuthors());
    this.router.get('/authors/:id', this.controller.getAuthorByID());
  }
}
