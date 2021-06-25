import fetch from 'node-fetch';
import { IAnimeQuoteResponse } from "./IAnimeQuoteResponse";

export class AnimeManager {
  private readonly baseURL: Readonly<string>;

  public constructor() {
    this.baseURL = 'https://animechan.vercel.app/api';
  }

  public async getRandomQuote(): Promise<Readonly<IAnimeQuoteResponse>> {
    try {
      const res = await fetch(`${this.baseURL}/random`);
      const json: Readonly<IAnimeQuoteResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  public async getTenRandomQuotes(): Promise<ReadonlyArray<IAnimeQuoteResponse>> {
    try {
      const res = await fetch(`${this.baseURL}/quotes`);
      const json: ReadonlyArray<IAnimeQuoteResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  public async getQuotesByAnimeTitle(title: string): Promise<ReadonlyArray<IAnimeQuoteResponse>> {
    try {
      const res = await fetch(`${this.baseURL}/quotes/anime?title=${title}`);
      const json: ReadonlyArray<IAnimeQuoteResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  public async getQuotesByCharacter(name: string): Promise<ReadonlyArray<IAnimeQuoteResponse>> {
    try {
      const res = await fetch(`${this.baseURL}/quotes/character?name=${name}`);
      const json: ReadonlyArray<IAnimeQuoteResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  public async getAvailableAnimes(): Promise<ReadonlyArray<string>> {
    try {
      const res = await fetch(`${this.baseURL}/available/anime`);
      const json: ReadonlyArray<string> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }
}
