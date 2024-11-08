import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { CustodiosModel } from '../models/custodios.model';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustodioService {
  private baseUrl = environment.apiUrl + 'api/v1/custodio';

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

  // Obtener todos los custodios
  getAllCustodios(): Observable<ResponseModel<CustodiosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<CustodiosModel[]>>(`${this.baseUrl}`, { headers });
  }

  // Agregar un nuevo custodio
  addCustodio(custodio: any): Observable<ResponseModel<CustodiosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<CustodiosModel>>(`${this.baseUrl}/crear`, custodio, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Custodio creado con ID: ${custodio.idCustodio}`).subscribe();
          }
        })
      );
  }

  // Actualizar un custodio
  updateCustodio(custodio: CustodiosModel): Observable<ResponseModel<CustodiosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<CustodiosModel>>(`${this.baseUrl}/actualizar/${custodio.idCustodio}`, custodio, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Custodio actualizado con ID: ${custodio.idCustodio}`).subscribe();
          }
        })
      );
  }

  // Eliminar un custodio
  deleteCustodio(custodioId: number): Observable<ResponseModel<CustodiosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<CustodiosModel>>(`${this.baseUrl}/eliminar/${custodioId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Custodio eliminado con ID: ${custodioId}`).subscribe();
          }
        })
      );
  }
}
