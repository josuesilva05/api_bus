import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { idData } from 'src/data/ids.data';
import { linhaData } from 'src/data/linhas.data';

@Injectable()
export class LinhasService {
  constructor(private httpService: HttpService) {}
  getIdData() {
    return idData;
  }

  getLineData() {
    return linhaData;
  }

  getLinesById(id_linha: string): Observable<any> {
    const url = `https://zn5.sinopticoplus.com/api/mapaExterno/linha/1170/linha/${id_linha}`;
    return this.httpService.get(url).pipe(
        map((response) => response.data));
  }
}
