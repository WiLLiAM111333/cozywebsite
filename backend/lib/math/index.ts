import { Constants } from '../../src/utils/constants';
const { HEX_VALUES } = Constants;

export class InternalMath {
  private round(number: number): number {
    const firstDecimal = Number(number.toFixed(1).slice(2));
    const newNumber = (number - Number(`0.${firstDecimal}`));
  
    return firstDecimal <= 5
      ? newNumber - 1
      : newNumber + 1;
  }

  private nsort(vals: Array<number>): Array<number> {
    return vals.sort((a: number, b: number) => a - b);
  }

  private isNumber(val: unknown) {
    let num: any;
    
    if(typeof num === 'number' || Number.isInteger(num)) {
      return true;
    }

    if(typeof Number(val) === 'number' && !isNaN(Number(val))) {
      num = Number(val);
    } else if(typeof val === 'string' && val.match(/^\d+$/)) {
      num = parseInt(val, 10);
    }

    if(isNaN(num)) {
      return false;
    }

    return true
  }

  private numbers(vals: Array<unknown>): Array<number> {
    const nums: Array<number> = []

    for(let i = 0; i < vals.length; i++) {
      if(this.isNumber(vals[i])) {
        nums.push(+vals[i])
      }
    }

    return nums
  }

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

  public binaryToDecimal(binary: string) {
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
