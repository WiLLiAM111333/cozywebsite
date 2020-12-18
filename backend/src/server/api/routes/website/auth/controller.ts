import { Controller } from "../../../../../../lib/controller/Controller";
import { Request, Response } from 'express';
import { OAuth2 } from '../../../../../../lib/discord/oauth2/OAuth2';
import { Constants } from '../../../../../utils/constants';

const { CLIENT_ID, CLIENT_SECRET, OAUTH_REDIRECT } = Constants;

export class AuthController extends Controller {
  private ouath: OAuth2;

  public constructor() {
    super();

    this.ouath = new OAuth2({
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      grantType: 'access_token',
      redirectURI: OAUTH_REDIRECT,
      scopes: ['identify', 'email', 'guilds']
    });
  }
}
