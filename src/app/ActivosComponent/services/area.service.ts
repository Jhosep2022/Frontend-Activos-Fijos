import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { AreaModel } from '../models/area.model';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private baseUrl = environment.apiUrl + 'api/v1/area';

  constructor(
    private http: HttpClient,
    private jwtDecoderService: JwtdecoderService,
    private userServiceService: UserServiceService
  ) {}

  private obtenerUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecoderService.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }

  getAllAreas(): Observable<ResponseModel<AreaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<AreaModel[]>>(`${this.baseUrl}`, { headers });
  }

  addArea(area: any): Observable<ResponseModel<AreaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<AreaModel>>(`${this.baseUrl}/crear`, area, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Área creada con ID: ${area.idArea}`).subscribe();
          }
        })
      );
  }

  updateArea(area: AreaModel): Observable<ResponseModel<AreaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<AreaModel>>(`${this.baseUrl}/actualizar/${area.idArea}`, area, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Área actualizada con ID: ${area.idArea}`).subscribe();
          }
        })
      );
  }

  deleteArea(areaId: number): Observable<ResponseModel<AreaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<AreaModel>>(`${this.baseUrl}/eliminar/${areaId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Área eliminada con ID: ${areaId}`).subscribe();
          }
        })
      );
  }
}
