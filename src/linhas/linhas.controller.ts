import { Controller, Get, Param } from '@nestjs/common';
import { LinhasService } from './linhas.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('linhas')
@Controller('api/linha')
export class LinhasController {
  constructor(private readonly linhasService: LinhasService) {}
  
  // Obtém todos os IDs cadastrados
  @Get('/IDs')
  @ApiOperation({ summary: 'Todos os IDs cadastrados' })
  @ApiResponse({ status: 200, description: 'Linhas retornadas com sucesso' })
  obterLinhas() {
    return this.linhasService.getIdData();
  }

  // Lista o nome das linhas cadastradas e seus respectivos IDs
  @Get('/listAll')
  @ApiOperation({
    summary: 'Lista o nome das linhas cadastradas e seus respectivos IDs',
  })
  @ApiResponse({ status: 200, description: 'Linhas retornadas com sucesso' })
  getAllLines() {
    return this.linhasService.getLineData();
  }

  // Obtém metadados de uma linha específica (ativa ou não)
  @Get('/:id_base')
  @ApiOperation({
    summary: 'Dados base de uma linha',
  })
  @ApiParam({
    name: 'id_base',
    description: 'ID base da linha',
    type: String,
    required: true,
    example: '56f04f8b298843ac7b7e2184',
  })
  @ApiResponse({ status: 200, description: 'Linha retornada com sucesso' })
  getLineById(
    @Param('id_base') id_base: string
  ) {
    return this.linhasService.getLinesById(id_base);
  }
}
