import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';
import { QuoteManager } from "../../../../../../lib/quote";

export class KanyeController extends Controller {
  private quoteManager: QuoteManager;

  public constructor() {
    super();

    this.quoteManager = new QuoteManager();
  }

  public getKanyeQuote(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      try {
        const quote = await this.quoteManager.getKanyeQuote();

        res.status(200).json({ quote });
      } catch (err) {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      } finally {
        // Log the request, wether it failed or not
      }
    }
  }
}
