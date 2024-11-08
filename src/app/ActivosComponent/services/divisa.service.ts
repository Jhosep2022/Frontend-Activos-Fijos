import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { DivisaModel } from '../models/divisa.model';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {
  private baseUrl = environment.apiUrl + 'api/v1/monedas';

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

  // Obtener todas las divisas
  getAllCurrency(): Observable<ResponseModel<DivisaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<DivisaModel[]>>(`${this.baseUrl}`, { headers });
  }

  // Agregar una nueva divisa
  addCurrency(currency: any): Observable<ResponseModel<DivisaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<DivisaModel>>(`${this.baseUrl}/crear`, currency, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Divisa creada con ID: ${currency.idDivisa}`).subscribe();
          }
        })
      );
  }

  // Actualizar una divisa
  updateCurrency(currency: DivisaModel): Observable<ResponseModel<DivisaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<DivisaModel>>(`${this.baseUrl}/actualizar/${currency.idDivisa}`, currency, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Divisa actualizada con ID: ${currency.idDivisa}`).subscribe();
          }
        })
      );
  }

  // Eliminar una divisa
  deleteCurrency(idDivisa: number): Observable<ResponseModel<DivisaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<DivisaModel>>(`${this.baseUrl}/eliminar/${idDivisa}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Divisa eliminada con ID: ${idDivisa}`).subscribe();
          }
        })
      );
  }
}
