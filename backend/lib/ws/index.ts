import { cyan, red } from 'chalk';
import { IncomingMessage } from 'http';
import WebSocket, { Server, ServerOptions } from 'ws';

/**
 * TODO: 
 * * Implement heartbeat interval
 * * Prevent Spam
 * * Prevent MITM Attacks
 * * Prevent the same user from using the same socket in games (Might make a Game class for this)
 */
export class WebSocketServer {
  private wss: Server;

  public constructor(options: ServerOptions) {
    this.wss = new Server(options);
  }
  
  /**
   * Initializes the server
   */
  public start() {
    this.wss.on('connection', this.onconnect);

    console.log(`[${red('WSS')}] running on ${cyan(`http://localhost:${this.wss.options.port}`)}`);
  }

  private onconnect(ws: WebSocket, req: IncomingMessage): void {
    
  }
}
