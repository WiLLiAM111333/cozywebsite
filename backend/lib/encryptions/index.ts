export class Encryptions {
  private isLetter(char: string) {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  }

  private isNumber(char: string) {
    return /\d/.test(char[0]);
  }

  public caesarCipher(str: string, shifts = 3): string {
    str = str.toUpperCase();
    let newStr = '';

    for(let i = 0; i < str.length; i++) {
      const char = str[i];
      newStr += (this.isNumber(char) || this.isLetter(char)) 
        ? String.fromCharCode((char.charCodeAt(0) + shifts - 65) % 26 + 65)
        : char;
    }

    return newStr;
  }

  public ROT13(str: string) {
    return this.caesarCipher(str, 13);
  }
}
