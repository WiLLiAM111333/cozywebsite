import { OAuth2Constructor } from "./OAuth2Constructor";
import { Constants } from "../../../src/utils/constants";
import { IOAuthEndpoints } from "./IOAuthEndpoints";

const { OAUTH_REDIRECT, OAuthEndpoints } = Constants;

export class OAuth2 {
  private clientID: string;
  private clientSecret: string;
  private grantType: string;
  private code: string;
  private scope: string;
  private redirectURI: string;
  private endpoints: IOAuthEndpoints;

  public constructor(data: OAuth2Constructor) {
    const {
      clientID,
      clientSecret,
      grantType,
      redirectURI,
      scopes
    } = data;

    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.grantType = grantType;
    this.redirectURI = redirectURI || OAUTH_REDIRECT;
    this.scope = scopes.join(' ');
    this.endpoints = OAuthEndpoints;
  }
}
