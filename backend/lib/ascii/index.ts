/**
 * Class to make ASCII actions cleaner and easier in a single container.
 * It is adviced to use the regular string functions for this if you only want to use 1 operation as it would be faster.
 * @exports
 * @class
 */
export class ASCII {
  /**
   * Converts a number to its corresponding ASCII character using String.fromCharCode(n).
   * @public
   * @function
   * @param {Number} value
   * @returns {String} 
   */
  public asciiToChar(value: number): string {
    return String.fromCharCode(value);
  }

  /**
   * Converts a character to its corresponding ASCII value using String.prototype.codePointAt(n).
   * @public
   * @function
   * @param {String} char
   * @returns {Number}
   */
  public charToASCII(char: string): number {
    return char.codePointAt(0);
  }

  /**
   * Makes a whole string into a string of ASCII and joins the values together by `-`.
   * @public
   * @function
   * @param {String} str 
   * @returns {String}
   */
  public strToAscii(str: string): string {
    let asciiStr = '';

    for(let i = 0; i < str.length; i++) {
      const char = str[i];
      asciiStr += `${char.codePointAt(0)}${i === str.length - 1 ? '' : '-'}`
    }

    return asciiStr;
  }

  /**
   * Takes a string of multiple ASCII values joined together by `-` like the function `ASCII.prototype.asciiToStr(ascii)` returns and makes it a regular human readable string`
   * @public
   * @function
   * @param {String} ascii 
   * @returns {String}
   */
  public asciiToStr(ascii: string): string {
    return ascii.split('-').reduce((accumulator, ascii) => accumulator += String.fromCharCode(Number(ascii)), '');
  }
}
