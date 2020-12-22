import { Request, Response } from "express";
import { DiscordController } from "../../../../../../lib/discord/controller/DiscordController";

export class UserController extends DiscordController {
  public constructor() {
    super();
  }

  public getByID(): (req: Request, res: Response) => void {
    return (req, res) => {
      const id = req.params.id;
      const user = this.client.users.cache.get(id);

      if(!user) {
        res.status(404).json({
          message: 'No user found',
          givenID: id
        });
      } else {
        res.status(200).json({ user })
      }
    }
  }

  public getAll(): (req: Request, res: Response) => void {
    return (req, res) => {
      res.status(200).json(this.client.users.cache.array());
    }
  }
}
