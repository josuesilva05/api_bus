import { Controller, Get, Param, Res } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';

@ApiTags('veiculos')
@Controller('api/veiculos')
export class VeiculosController {
    constructor(private readonly veiculosService: VeiculosService) {}

    @Get(':id_linha')
    @ApiOperation({ summary: 'Veículos online na linha {id_linha}' })
    @ApiParam({ name: 'id_linha', type: 'string', description: 'ID Base da linha' })
    getItinerarios(
        @Param('id_linha') id_linha: string
    ) {
        return this.veiculosService.getOnlineVeichles(id_linha);
    }

    @Get(':prefixo/:imagem')
    @ApiOperation({ summary: 'Obtém uma imagem do veículo pelo prefixo e número da imagem' })
    @ApiParam({ name: 'prefixo', description: 'Prefixo numérico do veículo (ex: 4001)' })
    @ApiParam({ name: 'imagem', description: 'Número da imagem (ex: 1)' })
    getImagemVeiculo(
        @Param('prefixo') prefixo: string,
        @Param('imagem') imagem: string,
        @Res() res: Response
    ) {
        // Validação de segurança
        if (!/^\d+$/.test(prefixo) || !/^\d+$/.test(imagem)) {
            return res.status(400).json({ message: 'Parâmetros inválidos' });
        }

        const caminhoImagem = join(process.cwd(), 'imgs', prefixo, `${imagem}.jpg`);
        
        return res.sendFile(caminhoImagem, (err) => {
            if (err) {
                res.status(404).json({ 
                    message: 'Imagem não encontrada',
                    error: 'Not Found'
                });
            }
        });
    }
}