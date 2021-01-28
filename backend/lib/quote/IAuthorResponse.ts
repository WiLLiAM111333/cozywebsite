import { IQuoteResponse } from "./IQuoteResponse";

export interface IAuthorResponse {
  _id: string;
  name: string;
  quoteCount: number;
  quotes: Array<IQuoteResponse>;
}
