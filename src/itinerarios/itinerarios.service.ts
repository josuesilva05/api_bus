import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { map } from "rxjs";
import { idData } from "src/data/ids.data";

@Injectable()

export class ItnerariosService {
    constructor(private readonly httpService: HttpService) { }

    async getItinerarios(linePrefix: string) {
        if (!linePrefix) {
            throw new Error("O parâmetro 'linePrefix' é obrigatório.");
        }

        const linha = idData.find(l => l?.id_base === linePrefix);

        if (!linha) {
            throw new Error(`Linha com prefixo ${linePrefix} não encontrada`);
        }
        
        const { id_migracao_ida, id_migracao_volta, id_base, nome_linha} = linha;

        const req1 = `https://zn5.m2mcontrol.com.br/api//forecast/lines/load/departure/${id_migracao_ida}/1170`;
        const req2 = `https://zn5.m2mcontrol.com.br/api//forecast/lines/load/departure/${id_migracao_volta}/1170`;
    
        try {
            const [idaResponse, voltaResponse] = await Promise.all([
                this.httpService.get(req1).pipe(map(response => response.data)).toPromise(),
                this.httpService.get(req2).pipe(map(response => response.data)).toPromise()
            ]);

            const idaObj = Array.isArray(idaResponse) ? idaResponse[0] : idaResponse;
            const voltaObj = Array.isArray(voltaResponse) ? voltaResponse[0] : voltaResponse;

            const idaHorarios = idaObj?.partidas || [];
            const voltaHorarios = voltaObj?.partidas || [];

            return {
                linha: nome_linha,
                id_base: id_base,
                ida: idaHorarios,
                volta: voltaHorarios,
            };

        } catch (error) {
            throw new Error("Erro ao buscar dados nas APIs externas: " + error.message)
        }
    }
}