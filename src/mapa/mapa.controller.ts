import { Controller, Get, Param } from '@nestjs/common';
import { MapaService } from './mapa.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('mapa')
@Controller('api/map')
export class MapaController {
    constructor(private readonly mapService: MapaService) {}

    @Get('/polylines/:id_base')
    @ApiOperation({ summary: 'Obtém polylines baseado no ID base da linha' })
    @ApiParam({ name: 'id_base', type: 'string', description: 'ID Base da linha' })
    async obterPolylines(@Param('id_base') id_base: string) {
        try {
            return await this.mapService.getPolylines(id_base);
        } catch (error) {
            return { error: error.message };
        }
    }
}
