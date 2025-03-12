import { Injectable } from "@nestjs/common";
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PontosService {
    constructor(private readonly httpService: HttpService) {}

    // Obtém todos os pontos da cidade
    getAllPoints(): Observable<any> {
        const url = 'https://zn5.m2mcontrol.com.br/api//forecast/lines/load/allPoints/1170';
        return this.httpService.get(url).pipe(
            map(response => response.data)
        );
    }

    // Obtém pontos baseados na localização do usuário
    getPointsByLoc(latitude: number, longitude: number, radius: number): Observable<any> {
        const url = `https://zn5.m2mcontrol.com.br/api//forecast/lines/load/busStop/${latitude}/${longitude}/1170?radiusInMeters=${radius}`;
        return this.httpService.get(url).pipe(
            map(response => response.data)
        );
    }
    
    getLinesOnlineByPoint(point_id: number): Observable<any> {
        const url = `https://zn5.m2mcontrol.com.br/api//forecast/lines/load/forecast/lines/fromPoint/${point_id}/1170`;
        return this.httpService.get(url).pipe(
            map(response => response.data)
        );
    }
}