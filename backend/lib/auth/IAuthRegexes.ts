export interface IAuthRegexes {
  disallowed: {
    username: Array<RegExp>;
    password: Array<RegExp>;
  }
  required: {
    username: Array<RegExp>;
    email: Array<RegExp>;
    password: Array<RegExp>;
  }
}
