export abstract class DataFileParser {
  protected abstract toArray(data: string): Array<unknown>;
  public abstract parse(path: string): Promise<Array<unknown>>;
  public abstract toJSON(dataPath: string): Promise<string>;
  public abstract toJSON(dataPath: string, targetPath: string): Promise<string>;
  public abstract toJSON(dataPath: string, targetPath?: string): Promise<string>;
}
