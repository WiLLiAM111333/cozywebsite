export class Util {
  public arrayToMarkdown(arr: Array<unknown>): string {
    const lines = `+${'-'.repeat(arr.length * 6)}+`;
    return `${lines}\n|  ${arr.join('  |  ')}  |\n${lines}`
  }
}
