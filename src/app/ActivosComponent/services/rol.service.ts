import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { RolModel } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private baseUrl = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) {}

  getAllRols(): Observable<ResponseModel<RolModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<RolModel[]>>(`${this.baseUrl}`, { headers });
  }

  addRol(rol: any): Observable<ResponseModel<RolModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<RolModel>>(`${this.baseUrl}/crear`, rol, { headers });
  }

  updateRol(rol: any): Observable<ResponseModel<RolModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<RolModel>>(`${this.baseUrl}/actualizar/${rol.id}`, rol, { headers });
  }

  deleteRol(rolId: number): Observable<ResponseModel<RolModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<RolModel>>(`${this.baseUrl}/eliminar/${rolId}`, { headers });
  }
}
