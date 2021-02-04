import { IRedditMemeData } from "./IRedditMemeData";

export interface IRedditResponse {
  count: number; 
  memes: Array<IRedditMemeData>
}
