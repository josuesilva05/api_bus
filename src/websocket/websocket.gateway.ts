import { 
    WebSocketGateway, 
    WebSocketServer, 
    OnGatewayConnection, 
    OnGatewayDisconnect,
    SubscribeMessage 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { WebSocketService } from './websocket.service';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    }
  })
  export class WebSocketBusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private intervalIds: Map<string, NodeJS.Timeout>; 
  
    constructor(private readonly webSocketService: WebSocketService) {
      this.intervalIds = new Map();
    }
  
    handleConnection(client: Socket) {
      const now = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Cuiaba', hour: '2-digit', minute: '2-digit', second: '2-digit'});
      console.log(`Conexão às ${now}: ${client.id}`);
    }
    
    handleDisconnect(client: Socket) {
      //console.log(`Client disconnected: ${client.id}`);
      
      // Fecha a conexão com o WebSocket de origem
      this.webSocketService.closeOriginWebSocket(client.id);
  
      // Para o envio periódico
      const intervalId = this.intervalIds.get(client.id);
      if (intervalId) {
        clearInterval(intervalId);
        this.intervalIds.delete(client.id);
      }
    }
  
    @SubscribeMessage('bus_lines')
    handleSubscription(client: Socket, baseIds: string[]) {
      // Encontra as linhas de ônibus pelos IDs base
      const lines = this.webSocketService.findLinesByBaseIds(baseIds);
  
      if (lines.length === 0) {
        client.emit('error', 'Nenhuma linha encontrada para os IDs informados');
        return;
      }
  
      // Monta a mensagem de subscrição
      const subscriptionMessage = this.webSocketService.createSubscriptionMessage(lines);
  
      // Conecta ao WebSocket de origem e repassa as mensagens
      this.webSocketService.connectToOriginWebSocket(
        client.id, 
        subscriptionMessage, 
        (data) => {
          // Repassa os dados recebidos do WebSocket de origem para o cliente
          client.emit('data', data);
        }
      );
  
      // Configura o envio periódico de "2" ao WebSocket de origem
      this.startKeepAlive(client.id);
  
      return {
        event: 'subscribed',
        data: `Inscrito para linha(s): ${lines.map(l => l.nome_linha).join(', ')}`
      };
    }
  
    // Inicia o envio periódico de "2" ao WebSocket de origem
    private startKeepAlive(clientId: string) {
      const intervalId = setInterval(() => {
        this.webSocketService.sendMessageToOriginWebSocket(clientId, '2');
      }, 7000);
      this.intervalIds.set(clientId, intervalId);
    }
  }
  