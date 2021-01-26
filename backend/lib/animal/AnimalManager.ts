import fetch from 'node-fetch';
import { cyan, red, yellow } from 'chalk';
import { Bird, Cat, Dog, Fox, Koala, Panda } from './payloads';
import { Constants } from '../../src/utils/constants';

const { FACTS, IMAGE } = Constants.ANIMAL_API_ENDPOINTS;

export class AnimalManager {
  public async getBirdData(): Promise<Bird.Data> {
    return {
      image: await this.getBirdImage(),
      fact: await this.getBirdFact()
    }
  }

  public async getBirdImage(): Promise<string> {
    try {
      const res = await fetch(IMAGE.BIRD);
      const json: Bird.Image = await res.json();

      return json.link;
    } catch (err) {
      this.handleError('bird', err);
    }
  }

  public async getBirdFact(): Promise<string> {
    try {
      const res = await fetch(FACTS.BIRD);
      const json: Bird.Fact = await res.json();

      return json.fact;
    } catch (err) {
      this.handleError('bird', err);
    }
  }

  public async getCatData(): Promise<Cat.Data> {
    return {
      image: await this.getCatImage(),
      fact: await this.getCatFact()
    }
  }

  public async getCatImage(): Promise<string> {
    try {
      const res = await fetch(IMAGE.CAT);
      const json: Cat.Image = await res.json();

      return json.link;
    } catch (err) {
      this.handleError('cat', err);
    }
  }

  public async getCatFact(): Promise<string> {
    try {
      const res = await fetch(FACTS.CAT);
      const json: Cat.Fact = await res.json();

      return json.fact;
    } catch (err) {
      this.handleError('cat', err);
    }
  }

  public async getDogData(): Promise<Dog.Data> {
    return {
      image: await this.getDogImage(),
      fact: await this.getDogFact()
    }
  }

  public async getDogImage(): Promise<string> {
    try {
      const res = await fetch(IMAGE.DOG);
      const json: Dog.Image = await res.json();

      return json.link;
    } catch (err) {
      this.handleError('dog', err);
    }
  }

  public async getDogFact(): Promise<string> {
    try {
      const res = await fetch(FACTS.DOG);
      const json: Dog.Fact = await res.json();

      return json.fact;
    } catch (err) {
      this.handleError('dog', err);
    }
  }

  public async getFoxData(): Promise<Fox.Data> {
    return {
      image: await this.getFoxImage(),
      fact: await this.getFoxFact()
    }
  }

  public async getFoxImage(): Promise<string> {
    try {
      const res = await fetch(IMAGE.FOX);
      const json: Fox.Image = await res.json();

      return json.link;
    } catch (err) {
      this.handleError('fox', err);
    }
  }

  public async getFoxFact(): Promise<string> {
    try {
      const res = await fetch(FACTS.FOX);
      const json: Fox.Fact = await res.json();

      return json.fact;
    } catch (err) {
      this.handleError('fox', err);
    }
  }

  public async getKoalaData(): Promise<Koala.Data> {
    return {
      image: await this.getKoalaImage(),
      fact: await this.getKoalaFact()
    }
  }

  public async getKoalaImage(): Promise<string> {
    try {
      const res = await fetch(IMAGE.KOALA);
      const json: Koala.Image = await res.json();

      return json.link;
    } catch (err) {
      this.handleError('koala', err);
    }
  }

  public async getKoalaFact(): Promise<string> {
    try {
      const res = await fetch(FACTS.KOALA);
      const json: Koala.Fact = await res.json();

      return json.fact;
    } catch (err) {
      this.handleError('koala', err);
    }
  }

  public async getPandaData(): Promise<Panda.Data> {
    return {
      image: await this.getPandaImage(),
      fact: await this.getPandaFact()
    }
  }

  public async getPandaImage(): Promise<string> {
    try {
      const res = await fetch(IMAGE.PANDA);
      const json: Panda.Image = await res.json();
      
      return json.link;
    } catch (err) {
      this.handleError('panda', err);
    }
  }
  
  public async getPandaFact(): Promise<string> {
    try {
      const res = await fetch(FACTS.PANDA);
      const json: Panda.Fact = await res.json();

      return json.fact;
    } catch (err) {
      this.handleError('panda', err);
    }
  }

  // Change with the logger class that isnt made yet
  public handleError(from: AnimalStrings, err: unknown): void {
    console.log(`[${red('BOT')}] [${yellow('AnimalManager')}] [${cyan(from).toUpperCase()}]`, err);
  }
}
