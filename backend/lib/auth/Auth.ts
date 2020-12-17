import { User } from "discord.js";
import { Base } from "..";
import { Constants } from '../../src/utils/constants';
import { IAuthRegexes } from "./IAuthRegexes";

const { AUTH_REGISTER_REGEXES } = Constants;

export class Auth extends Base {
  private regexes: IAuthRegexes;

  public constructor() {
    super();

    this.regexes = AUTH_REGISTER_REGEXES;
  }

  private verifyUsername(username: string): boolean {
    const disallowedRegexes = this.regexes.disallowed.username;
    const requiredRegexes = this.regexes.required.username;

    for(const regex of disallowedRegexes) {
      if(username.match(regex)) return false;
    }

    for(const regex of requiredRegexes) {
      if(!username.match(regex)) return false;
    }

    return true;
  }

  private verifyPassword(password: string): boolean {
    const disallowedRegexes = this.regexes.disallowed.password;
    const requiredRegexes = this.regexes.required.password;

    for(const regex of disallowedRegexes) {
      if(password.match(regex)) return false;
    }

    for(const regex of requiredRegexes) {
      if(!password.match(regex)) return false;
    }

    return true;
  }

  private verifyEmail(email: string): boolean {
    const requiredRegexes = this.regexes.required.email;

    for(const regex of requiredRegexes) {
      if(!email.match(regex)) return false;
    }

    return true;
  }

  public registerUser(user: User) {

  }
}
