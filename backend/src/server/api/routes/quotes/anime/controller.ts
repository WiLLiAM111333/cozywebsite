import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';
import { QuoteManager } from "../../../../../../lib/quote";

export class AnimeQuoteController extends Controller {
  private quoteManager: QuoteManager;
  
  public constructor() {
    super();

    this.quoteManager = new QuoteManager();
  }

  public getRandomQuote(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const quote = await this.quoteManager.animeManager.getRandomQuote();

        res.status(200).json({ quote });
      } catch (err) {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  public getTenRandomQuotes(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const quote = await this.quoteManager.animeManager.getTenRandomQuotes();

        res.status(200).json({ quote });
      } catch (err) {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }
  
  public getAvailableAnimes(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const quote = await this.quoteManager.animeManager.getAvailableAnimes();

        res.status(200).json({ quote });
      } catch (err) {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  public getQuotesByAnimeTitle(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { title } = req.query;
        const quote = await this.quoteManager.animeManager.getQuotesByAnimeTitle(title as string); // Hack of the century btw

        res.status(200).json({ quote });
      } catch (err) {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  public getQuotesByCharacter(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const { name } = req.query;
        const quote = await this.quoteManager.animeManager.getQuotesByCharacter(name as string); // Hack of the century btw

        res.status(200).json({ quote });
      } catch (err) {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }
}
