import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ItnerariosService } from './itinerarios.service';

@ApiTags('itinerarios')
@Controller('api/itinerarios')
export class ItnerariosController {
    constructor(private readonly itnerariosService: ItnerariosService) {}

    @Get(':id_base')
    @ApiOperation({ summary: 'Obtém a planilha de horários de uma linha' })
    @ApiParam({ name: 'id_base', description: 'Prefixo da linha (ex: 608)' })
    async getItinerarios(@Param('id_base') linePrefix: string) {
        return this.itnerariosService.getItinerarios(linePrefix);
    }
}