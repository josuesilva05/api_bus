import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapaService } from './mapa.service';
import { MapaController } from './mapa.controller';

@Module({
    imports: [HttpModule],
    providers: [MapaService],
    controllers: [MapaController]
})
export class MapaModule {}