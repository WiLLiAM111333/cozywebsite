import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';
import { QuoteManager } from "../../../../../../lib/quote";

export class QuotableController extends Controller {
  private quoteManager: QuoteManager;

  public constructor() {
    super();

    this.quoteManager = new QuoteManager();
  }

  public getRandomQuote(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const quote = await this.quoteManager.getRandomQuote();

        res.status(200).json(quote);
      } catch (err) {
        this.handleError(req, res, err);
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  public getQuoteByID(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const id = req.params.id;

      try {
        const quote = await this.quoteManager.getQuoteByID(req.params.id);
  
        if(quote) {
          res.status(200).json(quote)
        } else {
          res.status(400).json({ message: `No quote by the ID of '${id}' found!` });
        }
      } catch (err) {
        this.handleError(req, res, err);
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  public listAuthors(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const authors = await this.quoteManager.listAuthors();

        res.status(200).json(authors);
      } catch (err) {
        this.handleError(req, res, err);
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  public getAuthorByID(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const id = req.params.id;

      try {
        const author = await this.quoteManager.getAuthorByID(req.params.id);
  
        if(author) {
          res.status(200).json(author)
        } else {
          res.status(400).json({ message: `No author by the ID of '${id}' found!` });
        }
      } catch (err) {
        this.handleError(req, res, err);
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }

  private handleError(req: Request, res: Response, err: unknown): void {
    res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    console.log(err);
  }
}
