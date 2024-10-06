import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { DepreciacionesModel } from '../models/depreciaciones.model';

@Injectable({
  providedIn: 'root'
})
export class DepreciacionService {
  private baseUrlDepreciacion = 'http://localhost:8080/api/v1/depreciacion';

  constructor(private http: HttpClient) {}
  
  // Obtener todas las depreciaciones
  getAllDepreciaciones(): Observable<ResponseModel<DepreciacionesModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<DepreciacionesModel[]>>(`${this.baseUrlDepreciacion}`, { headers });
  }
  
  // Agregar una nueva depreciación
  addDepreciacion(depreciacion: any): Observable<ResponseModel<DepreciacionesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<DepreciacionesModel>>(`${this.baseUrlDepreciacion}/crear`, depreciacion, { headers });
  }
  
  updateDepreciacion(depreciacion: any): Observable<ResponseModel<DepreciacionesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<DepreciacionesModel>>(`${this.baseUrlDepreciacion}/actualizar/${depreciacion.id}`, depreciacion, { headers });
  }
  
  deleteDepreciacion(depreciacionid: number): Observable<ResponseModel<DepreciacionesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<DepreciacionesModel>>(`${this.baseUrlDepreciacion}/eliminar/${depreciacionid}`, { headers });
  }
  
}
