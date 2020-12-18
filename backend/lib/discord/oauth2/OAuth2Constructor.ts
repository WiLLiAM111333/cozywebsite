export interface OAuth2Constructor {
  clientID: string;
  clientSecret: string;
  grantType: string;
  scopes: Array<Scope>;
  redirectURI: string;
}
