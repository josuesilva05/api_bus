import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ItnerariosService } from './itinerarios.service';
import { ItnerariosController } from './itnerarios.controller';

@Module({
    imports: [HttpModule],
    providers: [ItnerariosService],
    controllers: [ItnerariosController],
})
export class ItnerariosModule {}