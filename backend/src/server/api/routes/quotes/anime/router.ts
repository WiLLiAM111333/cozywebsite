import { Router } from "../../../../../../lib/server/router/Router";
import { AnimeQuoteController } from './controller';
import { Application, Router as expressRouter } from "express";

export class AnimeQuoteRouter extends Router {
  declare protected readonly controller: Readonly<AnimeQuoteController>;

  public constructor(app: Application) {
    super({
      app,
      route: '/kanye',
      router: expressRouter(),
      controller: new AnimeQuoteController()
    });

    this.router.get('/', this.controller.getRandomQuote());
    this.router.get('/ten', this.controller.getTenRandomQuotes());
    this.router.get('/quotes/anime?title', this.controller.getQuotesByAnimeTitle());
    this.router.get('/quotes/character?name', this.controller.getQuotesByCharacter());
    this.router.get('/animes', this.controller.getAvailableAnimes());
  }
}
