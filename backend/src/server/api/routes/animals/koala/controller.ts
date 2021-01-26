import { AnimalManager } from "../../../../../../lib/animal/AnimalManager";
import { Controller } from "../../../../../../lib/server/controller/Controller";
import { Request, Response } from 'express';

export class KoalaController extends Controller {
  private animalManager: AnimalManager;

  public constructor() {
    super();

    this.animalManager = new AnimalManager();
  }

  public getFact(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const data = await this.animalManager.getKoalaFact()

      if(!data.length) {
        res.status(500).json({ message: 'Internal server error' })
      } else {
        res.status(200).json({ fact: data });
      }
    }
  }

  public getImage(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const data = await this.animalManager.getKoalaImage();

      if(!data.length) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ image: data });
      }
    }
  }

  public getData(): (req: Request, res: Response) => Promise<void> {
    return async (req, res) => {
      const data = await this.animalManager.getKoalaData();

      if(!('fact' in data || 'image' in data)) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json(data);
      }
    }
  }
}
