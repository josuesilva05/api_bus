import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';

@Module({
  imports: [HttpModule],
  providers: [VeiculosService],
  controllers: [VeiculosController]
})
export class VeiculosModule {}
