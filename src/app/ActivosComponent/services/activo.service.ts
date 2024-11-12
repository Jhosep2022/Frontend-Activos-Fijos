import { Injectable } from '@angular/core';
import { ActivosModel } from '../models/activos.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { UbicacionActivoModel } from '../models/direccion-activo.model';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  private baseUrl = environment.apiUrl + 'api/v1/activo';
  private auditoriaUrl = environment.apiUrl + 'api/auditoria';

  constructor(private http: HttpClient, private jwtDecoderService: JwtdecoderService) {}

  private logAuditoria(idUsuario: number, accion: string, detalles: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = {
      idUsuario: idUsuario,
      accion: accion,
      detalles: detalles
    };
    return this.http.post<any>(`${this.auditoriaUrl}/crear`, body, { headers });
  }

  getAllActivos(): Observable<ResponseModel<ActivosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<ActivosModel[]>>(`${this.baseUrl}`, { headers });
  }

  getActivoByProyectoId(proyectoId: number): Observable<ResponseModel<ActivosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<ActivosModel[]>>(`${this.baseUrl}/proyecto/${proyectoId}`, { headers });
  }

  addActivo(activo: any): Observable<ResponseModel<ActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const decodedToken = token ? this.jwtDecoderService.decodeToken(token) : null;
    const userId = decodedToken ? decodedToken.userId : null;

    return this.http.post<ResponseModel<ActivosModel>>(`${this.baseUrl}/crear`, activo, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.logAuditoria(userId, 'CREAR', `Activo creado con ID: ${activo.idActivo}`).subscribe();
          }
        })
      );
  }

  updateActivo(activo: ActivosModel): Observable<ResponseModel<ActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const decodedToken = token ? this.jwtDecoderService.decodeToken(token) : null;
    const userId = decodedToken ? decodedToken.userId : null;

    return this.http.put<ResponseModel<ActivosModel>>(`${this.baseUrl}/actualizar/${activo.idActivo}`, activo, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.logAuditoria(userId, 'ACTUALIZAR', `Activo actualizado con ID: ${activo.idActivo}`).subscribe();
          }
        })
      );
  }

  deleteActivo(activoId: number): Observable<ResponseModel<ActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const decodedToken = token ? this.jwtDecoderService.decodeToken(token) : null;
    const userId = decodedToken ? decodedToken.userId : null;

    return this.http.delete<ResponseModel<ActivosModel>>(`${this.baseUrl}/eliminar/${activoId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.logAuditoria(userId, 'ELIMINAR', `Activo eliminado con ID: ${activoId}`).subscribe();
          }
        })
      );
  }

  getUbicacionActivo(activoId: number): Observable<ResponseModel<UbicacionActivoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<UbicacionActivoModel>>(`${this.baseUrl}/${activoId}/ubicacion`, { headers });
  }
}
