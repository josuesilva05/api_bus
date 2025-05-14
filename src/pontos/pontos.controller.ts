import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PontosService } from './pontos.service';
import { map } from 'rxjs';

@ApiTags('pontos')
@Controller('api/pontos')
export class PontosController {
    constructor(private readonly pontosService: PontosService) { }

    // Retorna todos os pontos da cidade
    @Get('/allPoints')
    @ApiOperation({ summary: 'Retorna todos os pontos da cidade' })
    obterTodosPontos() {
        return this.pontosService.getAllPoints();
    }

    // Retorna pontos baseados na localização do usuário
    @Get('/byLoc/:lat/:long/:radius')
    @ApiOperation({ summary: 'Obtém pontos pela localização fornecida' })
    obtemPontosLatLong(
        @Param('lat') latitude: number,
        @Param('long') longitude: number,
        @Param('radius') radius: number
    ) {
        return this.pontosService.getPointsByLoc(latitude, longitude, radius);
    }

    // Retorna uma contagem de pontos próximos
    @Get('/byLoc/:lat/:long/:radius/count')
    @ApiOperation({ summary: 'Obtém uma contagem de pontos próximos' })
    obtemContagemPontos(
        @Param('lat') latitude: number,
        @Param('long') longitude: number,
        @Param('radius') radius: number
    ) {
        return this.pontosService.getPointsByLoc(latitude, longitude, radius).pipe(
            map((pontos: any[]) => {
                // // Log cada ponto individualmente para verificação
                // pontos.forEach((ponto, index) => {
                //     console.log(`Ponto ${index + 1}:`, ponto);
                // });

                // Retornar a contagem de pontos
                return {
                    total: pontos.length,
                    pontos,
                };
            })
        );
    }

    // Retorna previsão de chegadas em um ponto específico
    @Get('/arrivals/:id_ponto')
    @ApiOperation({ summary: 'Previsão de chegadas em um ponto específico' })
    @ApiParam({ name: 'id_ponto', type: 'number', description: 'ID do ponto' })
    obterLinhasPorPontos(
        @Param('id_ponto') id_ponto: number
    ) {
        return this.pontosService.getLinesOnlineByPoint(id_ponto);
    }

}
