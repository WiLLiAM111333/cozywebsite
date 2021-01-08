import { InternalMath } from "../math";

// Make it read strings and return ascii
// Make it read numbers and return the character
// Make it read number strings and return the full on string
// Make it read strings and return ascii strings (join every number up with `-` and whitespace with a simple whitespace)
export class ASCII {
  private math: InternalMath;

  public constructor() {
    this.math = new InternalMath();
  }

  public asciiToChar(value: number): string {
    return String.fromCharCode(value);
  }

  public charToASCII(char: string): number {
    return char.codePointAt(0);
  }
}
