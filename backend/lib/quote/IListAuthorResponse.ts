export interface IListAuthorResponse {
  count: number;
  totalCount: number;
  lastItemIndex: number | null;
  results: Array<{
    _id: string;
    name: string;
    // The documentation says string and I have doubts so its both 🤣
    quoteCount: number | string;
  }>;
}
