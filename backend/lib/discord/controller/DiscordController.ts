import { Controller } from "../../server/controller/Controller";
import { client } from '../../../src/bot';
import { CozyClient } from "../bot/client/CozyClient";

export abstract class DiscordController extends Controller {
  protected client: CozyClient;

  public constructor() {
    super();

    this.client = client;
  }
}
