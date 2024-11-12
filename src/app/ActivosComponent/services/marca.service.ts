import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarcaModel } from '../models/marca.model';
import { ResponseModel } from '../models/response.model';
import { UserServiceService } from './user-service.service'; // Importar UserServiceService
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private baseUrlMarca = environment.apiUrl + 'api/v1/marca';

  constructor(
    private http: HttpClient,
    private jwtDecoderService: JwtdecoderService,
    private userServiceService: UserServiceService // Inyecta UserServiceService
  ) {}

  private obtenerUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecoderService.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }

  // Obtener todas las marcas
  getAllMarcas(): Observable<ResponseModel<MarcaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<MarcaModel[]>>(`${this.baseUrlMarca}`, { headers });
  }

  // Agregar una nueva marca
  addMarca(marca: MarcaModel): Observable<ResponseModel<MarcaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<MarcaModel>>(`${this.baseUrlMarca}/crear`, marca, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Marca creada con ID: ${marca.idMarca}`).subscribe();
          }
        })
      );
  }

  // Actualizar una marca existente
  updateMarca(marca: MarcaModel): Observable<ResponseModel<MarcaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<MarcaModel>>(`${this.baseUrlMarca}/actualizar/${marca.idMarca}`, marca, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Marca actualizada con ID: ${marca.idMarca}`).subscribe();
          }
        })
      );
  }

  // Eliminar una marca
  deleteMarca(marcaId: number): Observable<ResponseModel<MarcaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<MarcaModel>>(`${this.baseUrlMarca}/eliminar/${marcaId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Marca eliminada con ID: ${marcaId}`).subscribe();
          }
        })
      );
  }
}
