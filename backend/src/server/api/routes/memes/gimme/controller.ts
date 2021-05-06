import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';
import { MemeManager } from "../../../../../../lib/memes/MemesManager";

export class GimmeController extends Controller {
  private memeManager: MemeManager;

  public constructor() {
    super();

    this.memeManager = new MemeManager();
  }
  
  public getRedditMeme(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const subreddit = req.query.sub as SubredditStrings;
      const meme = await this.memeManager.getRedditMeme(subreddit);

      if(meme) {
        res.status(200).json({ ...meme });
      } else {
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      }
    }
  }
}
