import { CSVParser } from "./csv/CSVParser";
import { TXTParser } from "./txt/TXTParser";

export class DataHandler {
  public txtParser: TXTParser;
  public csvParser: CSVParser;

  public constructor() {
    this.txtParser = new TXTParser();
    this.csvParser = new CSVParser();
  }
}
