import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { DivisaModel } from '../models/divisa.model';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {
  private baseUrl = 'http://localhost:8080/api/v1/monedas';

  constructor(private http: HttpClient) {}

  getAllCurrency(): Observable<ResponseModel<DivisaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<DivisaModel[]>>(`${this.baseUrl}`, { headers });
  }

  addCurrency(currency: any): Observable<ResponseModel<DivisaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<DivisaModel>>(`${this.baseUrl}/crear`, currency, { headers });
  }

  updateCurrency(currency: any): Observable<ResponseModel<DivisaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<DivisaModel>>(`${this.baseUrl}/actualizar/${currency.id}`, currency, { headers });
  }

  deleteCurrency(idDivisa: number): Observable<ResponseModel<DivisaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<DivisaModel>>(`${this.baseUrl}/eliminar/${idDivisa}`, { headers });
  }
}
