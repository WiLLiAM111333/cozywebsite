import fetch from 'node-fetch'
import { IAuthorResponse } from './IAuthorResponse';
import { IListAuthorResponse } from './IListAuthorResponse';
import { IQuoteResponse } from './IQuoteResponse';

// I dont know what could go wrong with any of the API's im using here, so catch blocks are just gonna log until I figure something out

/**
 * @description A class to handle all quote data
 * @exports
 * @class
 */
export class QuoteManager {
  /**
   * @description The base URL to the quotable API
   * @private
   * @type {String}
   */
  private quotableURL: string;
  /**
   * @description The base URL to the kanye quote API 
   * @private
   * @type {String}
   */
  private kanyeQuoteURL: string;

  /**
   * @public
   * @constructor
   */
  public constructor() {
    this.quotableURL = 'https://api.quotable.io';
    this.kanyeQuoteURL = 'https://api.kanye.rest';
  }

  /**
   * @description Gets a random quote from the [Quotable API](https://github.com/lukePeavey/quotable)
   * @public
   * @method
   * @async
   * @returns {Promise<IQuoteResponse>} A random quote response object
   */
  public async getRandomQuote(): Promise<IQuoteResponse> {
    try {
      const res = await fetch(`${this.quotableURL}/random`)
      const json: IQuoteResponse = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @description Gets a quote by ID from the [Quotable API](https://github.com/lukePeavey/quotable)
   * @public
   * @method
   * @async
   * @param {String} id
   * @returns {Promise<IQuoteResponse>} A quote response object
   */
  public async getQuoteByID(id: string): Promise<IQuoteResponse> {
    try {
      const res = await fetch(`${this.quotableURL}/${id}`);
      const json: IQuoteResponse = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @description Lists partial author objects from the [Quotable API](https://github.com/lukePeavey/quotable) 
   * @public
   * @method
   * @async
   * @returns {Promise<Array<IListAuthorResponse>>} An object of partial authors
   */
  public async listAuthors(): Promise<Array<IListAuthorResponse>> {
    try {
      const res = await fetch(`${this.quotableURL}/authors`);
      const json: Array<IListAuthorResponse> = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @description Gets an author by ID from the [Quotable API](https://github.com/lukePeavey/quotable)
   * @public
   * @method
   * @async
   * @param {String} id 
   * @returns {Promise<IAuthorResponse>} An author response object
   */
  public async getAuthorByID(id: string): Promise<IAuthorResponse> {
    try {
      const res = await fetch(`${this.quotableURL}/authors/${id}`);
      const json: IAuthorResponse = await res.json();

      return json;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @description Gets a kanye quote from the [Kanye West API](https://kanye.rest/)
   * @public
   * @method
   * @async
   * @returns {Promise<{ quote: string }>} A simple quote object
   */
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