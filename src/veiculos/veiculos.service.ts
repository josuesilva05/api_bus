import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class VeiculosService {
    constructor(private readonly httpService: HttpService) {}

    // Obtém veículos online para uma linha específica
    getOnlineVeichles(id_linha: string): Observable<any> {
        const url = `https://zn5.sinopticoplus.com/api/mapaExterno/linha/1170/linha/${id_linha}`;
        return this.httpService.get(url).pipe(
            map(response => response.data.veiculos)
        );
    }
}
