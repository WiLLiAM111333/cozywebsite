export class Leetifier {
  public leetify(str: string): string {
    return str
      .toUpperCase()
      .replace(/a/ig, '4')
      .replace(/e/ig, '3')
      .replace(/s|z/ig, '5')
      .replace(/t/ig, '7')
      .replace(/g/ig, '6')
      .replace(/o/ig, '0')
      .replace(/i/ig, '1')
  }

  public clean(str: string): string {
    return str
      .replace(/4/g, 'a')
      .replace(/3/ig, 'e')
      .replace(/5/ig, 's')
      .replace(/7/ig, 't')
      .replace(/6/ig, 'g')
      .replace(/0/ig, 'o')
      .replace(/1/ig, 'i')
      .toUpperCase()
  }
}
