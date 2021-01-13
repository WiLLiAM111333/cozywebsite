import { Constants } from '../../src/utils/constants';
const { HEX_VALUES } = Constants;

/**
 * The internal class to handle stuff the Math class from the base JS library cant 
 * @exports
 * @class
 */
export class InternalMath {
  /**
   * Sorts the array of numbers from smallest to highest number
   * @private
   * @method
   * @param {Array<Number>} vals
   * @returns {Array<Number>}
   */
  private nsort(vals: Array<number>): Array<number> {
    return vals.sort((a: number, b: number) => a - b);
  }

  /**
   * Boolean check to see if the provided data is a number
   * @private
   * @method
   * @param {unknown} data
   * @returns {Boolean}
   */
  private isNumber(data: unknown): boolean {
    let num: any;

    if(!isNaN(Number(data))) {
      num = Number(data);
    }

    return (typeof num === 'number' || Number.isInteger(num))
  }

  /**
   * Take an array or tuple of any type and size, then returns all the numbers in it in a new array
   * @private
   * @method
   * @param {Array<unknown>} vals 
   * @returns {Array<Number>}
   */
  private numbers(vals: Array<unknown>): Array<number> {
    const nums: Array<number> = []

    for(let i = 0; i < vals.length; i++) {
      if(this.isNumber(vals[i])) {
        nums.push(+vals[i])
      }
    }

    return nums
  }

  /**
   * Uses the Estimation method to return an interpolated percentage number
   * @public
   * @method
   * @param {Array<Number>} vals 
   * @param {Number} ptile 
   * @returns {Number}
   */
  public percentile(vals: Array<number>, ptile: number): number {
    vals = this.numbers(vals);

    if(vals.length === 0 || ptile == null || ptile < 0) {
      return NaN
    }

    if (ptile > 1) {
      ptile = 1;
    }

    vals = this.nsort(vals);
    const i = (vals.length * ptile) - 0.5;

    if ((i | 0) === i) {
      return vals[i]
    }

    // interpolated percentile -- using Estimation method
    const intPart = i | 0
    const fract = i - intPart
    
    return (1 - fract) * vals[intPart] + fract * vals[Math.min(intPart + 1, vals.length - 1)]
  }

  /**
   * Converts a hexadecimal number in string form to a decimal number
   * @public
   * @method
   * @param {String} hex
   * @returns {Number} 
   */
  public hexToDecimal(hex: string): number {
    if(hex.indexOf('0x') !== -1) return Number(hex);

    const resultsArr = [];
    let pos = 0
    
    for(let i = hex.length - 1; i >= 0; i--) {
      resultsArr[i] = HEX_VALUES[hex[i]] * (16 ** pos);
      pos++;  
    }

    return resultsArr.reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Converts a binary number in string form to a decimal number
   * @public
   * @method
   * @param {String} binary
   * @returns {Number} 
   */
  public binaryToDecimal(binary: string): number {
    binary = binary.indexOf('0b') !== -1
      ? binary.slice(2)
      : binary;

    const resultsArr = [];
    let pos = 0;

    for(let i = binary.length -1; i >= 0; i--) {
      if(binary[i] === '1') {
        resultsArr.push(2 ** pos);
      }

      pos++
    }

    return resultsArr.reduce((prev, curr) => prev + curr, 0)
  }
}
