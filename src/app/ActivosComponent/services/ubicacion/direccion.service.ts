import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../../models/response.model';
import { DireccionModel } from '../../models/ubicacion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private baseUrl = 'http://localhost:8080/api/v1/direccion';

  constructor(private http: HttpClient) {}
  
  getAllDirecciones(): Observable<ResponseModel<DireccionModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<DireccionModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  addDireccion(direccion: any): Observable<ResponseModel<DireccionModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<DireccionModel>>(`${this.baseUrl}/crear`, direccion, { headers });
  }
  
  updateDireccion(direccion: any): Observable<ResponseModel<DireccionModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<DireccionModel>>(`${this.baseUrl}/actualizar/${direccion.id}`, direccion, { headers });
  }
  
  deleteDireccion(direccionId: number): Observable<ResponseModel<DireccionModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<DireccionModel>>(`${this.baseUrl}/eliminar/${direccionId}`, { headers });
  }
  
}
