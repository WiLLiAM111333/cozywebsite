import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';
import { MemeManager } from "../../../../../../lib/memes/MemesManager";

export class RandomAPIController extends Controller {
  private memeManager: MemeManager;

  public constructor() {
    super();

    this.memeManager = new MemeManager();
  }
  
  public getMeme(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const meme = await this.memeManager.getRandomAPIMeme();

      res.status(200).json({ ...meme });
    }
  }
}
