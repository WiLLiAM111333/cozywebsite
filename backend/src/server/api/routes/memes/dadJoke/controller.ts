import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';
import { MemeManager } from "../../../../../../lib/memes/MemesManager";

export class DadJokeController extends Controller {
  private memeManager: MemeManager;

  public constructor() {
    super();

    this.memeManager = new MemeManager();
  }
  
  public getDadJoke(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const dadJoke = await this.memeManager.getDadJoke();

      res.status(200).json({ ...dadJoke });
    }
  }
}
