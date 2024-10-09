import { Injectable } from '@angular/core';
import { EstadosModel } from '../models/estadosUso.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsoService {
  private baseUrlEstado = environment.apiUrl+'api/v1/estadoActivo';

  constructor(private http: HttpClient) {}
  
  // Obtener todos los estados
  getAllEstados(): Observable<ResponseModel<EstadosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<EstadosModel[]>>(`${this.baseUrlEstado}`, { headers });
  }
  
  // Agregar un nuevo estado
  addEstado(estado: any): Observable<ResponseModel<EstadosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<EstadosModel>>(`${this.baseUrlEstado}/crear`, estado, { headers });
  }
  
  updateEstado(estado: any): Observable<ResponseModel<EstadosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<EstadosModel>>(`${this.baseUrlEstado}/actualizar/${estado.id}`, estado, { headers });
  }
  
  deleteEstado(estadoid: number): Observable<ResponseModel<EstadosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<EstadosModel>>(`${this.baseUrlEstado}/eliminar/${estadoid}`, { headers });
  }
  
}
