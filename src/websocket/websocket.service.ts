import { BusLine } from './interfaces/linhas.interface';
import { Injectable } from '@nestjs/common';
import { idData } from 'src/data/ids.data';
import * as WebSocket from 'ws';
@Injectable()
export class WebSocketService {
  private busLines: BusLine[];
  private originWebSockets: Map<string, WebSocket>; // Armazena as conexões WebSocket de origem para cada cliente

  constructor() {
    this.busLines = idData;
    this.originWebSockets = new Map();
  }

  // Busca linhas de ônibus por ID base
  findLinesByBaseIds(baseIds: string[]): BusLine[] {
    return this.busLines.filter(line => baseIds.includes(line.id_base));
  }

  // Monta a mensagem de subscrição para os IDs fornecidos
  createSubscriptionMessage(lines: BusLine[]): string {
    const subscriptionIds = lines.flatMap(line => [
      `${line.id_base}:${line.id_ida}:*`, 
      `${line.id_base}:${line.id_volta}:*`
    ]);

    return `42/mapasinotico,["setupSubs",[${subscriptionIds.map(id => `"${id}"`).join(',')}]]`;
  }

  // Conecta ao WebSocket de origem
  connectToOriginWebSocket(clientId: string, subscriptionMessage: string, clientCallback: (data: any) => void) {
    // URL do WebSocket de origem
    const originUrl = 'wss://websocket2.zn5.m2mcontrol.com.br/socket.io/?clienteId=1170&subs=_&EIO=3&transport=websocket';

    const originWebSocket = new WebSocket(originUrl);

    originWebSocket.on('open', () => {
      //console.log('Conexão com WebSocket de origem estabelecida');
      
      // Sequência de mensagens iniciais
      originWebSocket.send('40/mapasinotico');
      originWebSocket.send('42/mapasinotico,["setupSubs",["_"]]');
      
      // Mensagem de subscrição para linhas específicas
      originWebSocket.send(subscriptionMessage);
    });

    originWebSocket.on('close', () => {
      //console.log('Conexão com WebSocket de origem fechada');
      this.originWebSockets.delete(clientId); // Remove a conexão do mapa
    });

    originWebSocket.on('message', (data) => {
      try {
        const messageString = data.toString('utf8'); // Converte o buffer para string
        if (messageString.startsWith('42/mapasinotico,')) {
          const jsonData = JSON.parse(messageString.substring(16)); // Remove o prefixo '42/mapasinotico,' e converte o restante para JSON
          clientCallback(jsonData); // Passa o JSON para o callback
        }
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    });

    originWebSocket.on('error', (error) => {
      console.error('Erro no WebSocket de origem:', error);
    });

    this.originWebSockets.set(clientId, originWebSocket); // Armazena a conexão no mapa
  }

  // Envia mensagem para o WebSocket de origem de um cliente específico
  sendMessageToOriginWebSocket(clientId: string, message: string) {
    const originWebSocket = this.originWebSockets.get(clientId);
    if (originWebSocket && originWebSocket.readyState === originWebSocket.OPEN) {
      originWebSocket.send(message);
    }
  }

  // Fecha a conexão com o WebSocket de origem de um cliente específico
  closeOriginWebSocket(clientId: string) {
    const originWebSocket = this.originWebSockets.get(clientId);
    if (originWebSocket) {
      originWebSocket.close();
      this.originWebSockets.delete(clientId);
    }
  }
}
