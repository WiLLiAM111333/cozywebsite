import * as AnimalPayloads from './animal/payloads';
import { Base                        } from './Base';
import { AnimalManager               } from './animal/AnimalManager';
import { ASCII                       } from './ascii';
import { IWebSiteBan                 } from './ban/IWebSiteBan';
import { WebSiteBan                  } from './ban/WebSiteBan';
import { WebSiteBanConstructor       } from './ban/WebSiteBanConstructor';
import { ICoinflipUser               } from './games/coinflip/ICoinflipUser';
import { CoinflipUser                } from './games/coinflip/CoinflipUser';
import { Coinflip                    } from './games/coinflip';
import { TicTacToeManager            } from './games/ticTacToe/index';
import { SuperArray                  } from './dataStructures/superArray';
import { SuperMap                    } from './dataStructures/superMap';
import { CozyClient                  } from './discord/bot/client/CozyClient';
import { Command                     } from './discord/bot/structures/command/Command';
import { CommandCFGTableInsertObject } from './discord/bot/structures/command/CommandCFGTableInsertObject';
import { CommandConstructor          } from './discord/bot/structures/command/CommandConstructor';
import { CommandHelp                 } from './discord/bot/structures/command/CommandHelp';
import { CommandOptions              } from './discord/bot/structures/command/CommandOptions';
import { CommandRequirements         } from './discord/bot/structures/command/CommandRequirements';
import { ICommand                    } from './discord/bot/structures/command/ICommand';
import { CommandHandler              } from './discord/bot/structures/command/handler/CommandHandler';
import { DiscordController           } from './discord/controller/DiscordController';
import { IManager                    } from './discord/managers/IManager';
import { BaseManager                 } from './discord/managers/BaseManager';
import { ManagerTypes                } from './discord/managers/ManagerTypes';
import { IOAuthEndpoints             } from './discord/oauth2/IOAuthEndpoints';
import { OAuth2                      } from './discord/oauth2/OAuth2';
import { OAuth2Constructor           } from './discord/oauth2/OAuth2Constructor';
import { DiscordRouter               } from './discord/router/DiscordRouter';
import { DiscordRouterConstructor    } from './discord/router/DiscordRouterConstructor';
import { EvilInsultWrapper           } from './evilinsult';
import { Leetifier                   } from './leetifier';
import { InternalMath                } from './math';
import { MemeManager                 } from './memes/MemesManager';
import { IDadJokeResponse            } from './memes/dadJoke/IDadJokeResponse';
import { IRandomAPIMeme              } from './memes/randomAPI/IRandomAPIMeme';
import { IRedditMemeData             } from './memes/reddit/IRedditMemeData';
import { IRedditResponse             } from './memes/reddit/IRedditResponse';
import { owoify                      } from './owo';
import { IAuthorResponse             } from './quote/IAuthorResponse';
import { IListAuthorResponse         } from './quote/IListAuthorResponse';
import { IQuoteResponse              } from './quote/IQuoteResponse';
import { QuoteManager                } from './quote';
import { IUser                       } from './server/auth/user/IUser';
import { IUserBody                   } from './server/auth/user/IUserBody';
import { User                        } from './server/auth/user/User';
import { Controller                  } from './server/controller/Controller';
import { IRateLimit                  } from './server/ratelimit/IRateLimit';
import { RateLimit                   } from './server/ratelimit/RateLimit';
import { RateLimitConstructor        } from './server/ratelimit/RateLimitConstructor';
import { IRouter                     } from './server/router/IRouter';
import { Router                      } from './server/router/Router';
import { RouterConstructor           } from './server/router/RouterConstructor';
import { 
  SortBy, 
  SortOrder           
} from './quote/SortOrder';

import { 
  MusicQueue, 
  BaseQueue       
} from './dataStructures/queue';

import {
  DiscordBanManager,
  DiscordKickManager,
  DiscordMuteManager,
  DiscordReportManager,
  DiscordWarningManager 
} from './discord/managers/index';

export {
  Base,
  AnimalManager,
  ASCII,
  IWebSiteBan,
  WebSiteBan,
  WebSiteBanConstructor,
  ICoinflipUser,
  CoinflipUser,
  Coinflip,
  TicTacToeManager,
  MusicQueue,
  BaseQueue,
  AnimalPayloads,
  SuperArray,
  SuperMap,
  CozyClient,
  Command,
  CommandCFGTableInsertObject,
  CommandConstructor,
  CommandHelp,
  CommandOptions,
  CommandRequirements,
  ICommand,
  CommandHandler,
  DiscordController,
  IManager,
  BaseManager,
  ManagerTypes,
  IOAuthEndpoints,
  OAuth2,
  OAuth2Constructor,
  DiscordRouter,
  DiscordRouterConstructor,
  EvilInsultWrapper,
  Leetifier,
  InternalMath,
  MemeManager,
  IDadJokeResponse,
  IRandomAPIMeme,
  IRedditMemeData,
  IRedditResponse,
  owoify,
  IAuthorResponse,
  IListAuthorResponse,
  IQuoteResponse,
  SortBy, 
  SortOrder,
  QuoteManager,
  IUser,
  IUserBody,
  User,
  Controller,
  IRateLimit,
  RateLimit,
  RateLimitConstructor,
  IRouter,
  Router,
  RouterConstructor,
  DiscordBanManager,
  DiscordKickManager,
  DiscordMuteManager,
  DiscordReportManager,
  DiscordWarningManager
}
