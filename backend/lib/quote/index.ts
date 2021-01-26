import fetch from 'node-fetch'
import { IRandomQuoteResponse } from './IRandomQuoteResponse';

// I dont know what could go wrong with any of the API's im using here, so catch blocks are just gonna log until I figure something out
export class QuoteManager {
  private randomQuoteURL: string;
  private kanyeQuoteURL: string;

  public constructor() {
    this.randomQuoteURL = 'https://api.quotable.io/random';
    this.kanyeQuoteURL = 'https://api.kanye.rest';
  }

  public async getRandomQuote(): Promise<IRandomQuoteResponse> {
    try {
      const res = await fetch(this.randomQuoteURL)
      const json: IRandomQuoteResponse = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  public async getKanyeQuote(): Promise<{ quote: string }> {
    try {
      const res = await fetch(this.kanyeQuoteURL);
      const json: { quote: string } = await res.json();
      
      return json;
    } catch (err) {
      console.error(err);
    }
  }
}
