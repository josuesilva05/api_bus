import { WebSocketModule } from './websocket/websocket.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinhasModule } from './linhas/linhas.module';
import { PontosModule } from './pontos/pontos.module';
import { MapaModule } from './mapa/mapa.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { ItnerariosModule } from './itinerarios/itnerarios.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ItnerariosModule,
    LinhasModule,
    MapaModule,
    PontosModule,
    VeiculosModule,
    WebSocketModule
  ],
})
export class AppModule {}
