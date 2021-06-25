import fetch from 'node-fetch'
import { AnimeManager } from '../anime/AnimeManager';
import { IAuthorResponse } from './IAuthorResponse';
import { IListAuthorResponse } from './IListAuthorResponse';
import { IQuoteResponse } from './IQuoteResponse';

// I dont know what could go wrong with any of the API's im using here, so catch blocks are just gonna log until I figure something out

/**
 * A class to handle all quote data
 * @exports
 * @class
 */
export class QuoteManager {
  /**
   * The base URL to the quotable API
   */
  private readonly quotableURL: string;
  /**
   * The base URL to the kanye quote API 
   */
  private readonly kanyeQuoteURL: string;
  /**
   * The internal insantiation of the AnimeManager class to help with anime quotes
   */
  public readonly animeManager: AnimeManager;

  public constructor() {
    this.quotableURL = 'https://api.quotable.io';
    this.kanyeQuoteURL = 'https://api.kanye.rest';
    this.animeManager = new AnimeManager();
  }

  /**
   * Gets a random quote from the [Quotable API](https://github.com/lukePeavey/quotable)
   * @returns {Promise<IQuoteResponse>} A random quote response object
   */
  public async getRandomQuote(): Promise<Readonly<IQuoteResponse>> {
    try {
      const res = await fetch(`${this.quotableURL}/random`)
      const json: Readonly<IQuoteResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Gets a quote by ID from the [Quotable API](https://github.com/lukePeavey/quotable)
   * @param {String} id
   * @returns {Promise<IQuoteResponse>} A quote response object
   */
  public async getQuoteByID(id: string): Promise<Readonly<IQuoteResponse>> {
    try {
      const res = await fetch(`${this.quotableURL}/${id}`);
      const json: Readonly<IQuoteResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Lists partial author objects from the [Quotable API](https://github.com/lukePeavey/quotable) 
   * @returns {Promise<Array<IListAuthorResponse>>} An object of partial authors
   */
  public async listAuthors(): Promise<ReadonlyArray<IListAuthorResponse>> {
    try {
      const res = await fetch(`${this.quotableURL}/authors`);
      const json: ReadonlyArray<IListAuthorResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Gets an author by ID from the [Quotable API](https://github.com/lukePeavey/quotable)
   * @param {String} id 
   * @returns {Promise<IAuthorResponse>} An author response object
   */
  public async getAuthorByID(id: string): Promise<Readonly<IAuthorResponse>> {
    try {
      const res = await fetch(`${this.quotableURL}/authors/${id}`);
      const json: IAuthorResponse = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Gets a kanye quote from the [Kanye West API](https://kanye.rest/)
   * @returns {Promise<{ quote: string }>} A simple quote object
   */
  public async getKanyeQuote(): Promise<Readonly<{ quote: string }>> {
    try {
      const res = await fetch(this.kanyeQuoteURL);
      const json: Readonly<{ quote: string }> = await res.json();
      
      return json;
    } catch (err) {
      console.error(err);
    }
  }
}
