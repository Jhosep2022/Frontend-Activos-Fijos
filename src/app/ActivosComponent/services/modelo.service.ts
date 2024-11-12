import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloModel } from '../models/modelo.model';
import { ResponseModel } from '../models/response.model';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private baseUrlModelo = environment.apiUrl + 'api/v1/modelo';

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

  // Obtener todos los modelos
  getAllModelos(): Observable<ResponseModel<ModeloModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<ModeloModel[]>>(`${this.baseUrlModelo}`, { headers });
  }

  // Agregar un nuevo modelo
  addModelo(modelo: ModeloModel): Observable<ResponseModel<ModeloModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<ModeloModel>>(`${this.baseUrlModelo}/crear`, modelo, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Modelo creado con ID: ${modelo.idModelo}`).subscribe();
          }
        })
      );
  }

  // Actualizar un modelo existente
  updateModelo(modelo: ModeloModel): Observable<ResponseModel<ModeloModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<ModeloModel>>(`${this.baseUrlModelo}/actualizar/${modelo.idModelo}`, modelo, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Modelo actualizado con ID: ${modelo.idModelo}`).subscribe();
          }
        })
      );
  }

  // Eliminar un modelo
  deleteModelo(modeloId: number): Observable<ResponseModel<ModeloModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<ModeloModel>>(`${this.baseUrlModelo}/eliminar/${modeloId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Modelo eliminado con ID: ${modeloId}`).subscribe();
          }
        })
      );
  }
}
