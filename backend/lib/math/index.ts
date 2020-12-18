export class InternalMath {
  public nsort(vals: Array<number>): Array<number> {
    return vals.sort((a: number, b: number) =>  a - b );
  }
  
  public isNumber(val: unknown) {
    let num: any;
    
    if(typeof num === 'number') {
      return true;
    }

    if(typeof Number(val) === 'number') {
      num = Number(val);
    } else if(typeof val === 'string' && val.match(/^\d+$/)) {
      num = parseInt(val, 10);
    }
  
    if(isNaN(num)) {
      return false;
    }
  
    return true
  }
  
  public numbers(vals: Array<unknown>): Array<number> {
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
    const int_part = i | 0
    const fract = i - int_part
    
    return (1 - fract) * vals[int_part] + fract * vals[Math.min(int_part + 1, vals.length - 1)]
  }
}

