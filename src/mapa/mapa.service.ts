import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { idData } from "src/data/ids.data";

@Injectable()
export class MapaService {
    constructor(private readonly httpService: HttpService) {}

    async getPolylines(id_base: string) {
        const linha = idData.find(l => l.id_base === id_base);

        if (!linha) {
            throw new Error('ID base não encontrado');
        }

        const { id_ida, id_volta } = linha;

        // URLs das APIs externas
        const urlIda = `https://zn5.sinopticoplus.com/api/mapaExterno/trajeto/1170/${id_ida}`;
        const urlVolta = `https://zn5.sinopticoplus.com/api/mapaExterno/trajeto/1170/${id_volta}`;

        try {
            const [idaResponse, voltaResponse] = await Promise.all([
                this.httpService.get(urlIda).toPromise(),
                this.httpService.get(urlVolta).toPromise(),
            ]);

            if (!idaResponse || !idaResponse.data) {
                throw new Error('Erro ao buscar dados da API externa para ida');
            }
            const idaData = idaResponse.data[0]?.trajetos.map(t => ({
                fence: t.fence,
                way: t.way,
                sentido: t.sentido,
            }));

            if (!voltaResponse || !voltaResponse.data) {
                throw new Error('Erro ao buscar dados da API externa para volta');
            }
            const voltaData = voltaResponse.data[0]?.trajetos.map(t => ({
                fence: t.fence,
                way: t.way,
                sentido: t.sentido,
            }));

            return {
                linha: linha.nome_linha,
                polylines: [...idaData, ...voltaData],
            };
        } catch (error) {
            throw new Error('Erro ao buscar dados das APIs externas: ' + error.message);
        }
    }
}