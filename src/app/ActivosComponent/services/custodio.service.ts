import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { CustodiosModel } from '../models/custodios.model';

@Injectable({
  providedIn: 'root'
})
export class CustodioService {
  private baseUrl = 'http://localhost:8080/api/v1/custodio';

  constructor(private http: HttpClient) {}
  
  getAllCustodios(): Observable<ResponseModel<CustodiosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<CustodiosModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  addCustodio(custodio: any): Observable<ResponseModel<CustodiosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<CustodiosModel>>(`${this.baseUrl}/crear`, custodio, { headers });
  }
  
  updateCustodio(custodio: any): Observable<ResponseModel<CustodiosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<CustodiosModel>>(`${this.baseUrl}/actualizar/${custodio.id}`, custodio, { headers });
  }
  
  deleteCustodio(custodioId: number): Observable<ResponseModel<CustodiosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<CustodiosModel>>(`${this.baseUrl}/eliminar/${custodioId}`, { headers });
  }
}
