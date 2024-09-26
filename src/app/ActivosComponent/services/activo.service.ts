import { Injectable } from '@angular/core';
import { ActivosModel } from '../models/activos.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  private baseUrl = 'http://localhost:8080/api/v1/activo';

  constructor(private http: HttpClient) {}
  
  getAllActivos(): Observable<ResponseModel<ActivosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<ActivosModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  addActivo(activo: any): Observable<ResponseModel<ActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<ActivosModel>>(`${this.baseUrl}/crear`, activo, { headers });
  }
  
  updateActivo(activo: any): Observable<ResponseModel<ActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<ActivosModel>>(`${this.baseUrl}/actualizar/${activo.id}`, activo, { headers });
  }
  
  deleteActivo(activoId: number): Observable<ResponseModel<ActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<ActivosModel>>(`${this.baseUrl}/eliminar/${activoId}`, { headers });
  }
}
