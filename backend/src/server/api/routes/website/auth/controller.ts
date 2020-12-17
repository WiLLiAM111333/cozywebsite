import { Controller } from "../../../../../../lib/controller/Controller";
import { Request, Response } from 'express';
import { Constants } from "../../../../../utils/constants";

export class AuthController extends Controller {
  private disallowedRegexes = Constants.AUTH_REGISTER_REGEXES;

  public constructor() {
    super();
  }

  public registerUser(): (req: Request, res: Response) => void {
    return (req, res) => {
      
    }
  }
}
