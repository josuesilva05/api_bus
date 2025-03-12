import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LinhasController } from './linhas.controller';
import { LinhasService } from './linhas.service';

@Module({
  imports: [HttpModule],
  providers: [LinhasService],
  controllers: [LinhasController],
})
export class LinhasModule {}
