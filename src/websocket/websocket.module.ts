import { Module } from '@nestjs/common';
import { WebSocketBusGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  providers: [WebSocketBusGateway, WebSocketService]
})
export class WebSocketModule {}