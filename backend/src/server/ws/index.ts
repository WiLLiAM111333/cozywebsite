import { WebSocketServer } from '../../../lib/ws/index';

new WebSocketServer({ port: 8080, heartBeatInterval: 60000 }).start();
