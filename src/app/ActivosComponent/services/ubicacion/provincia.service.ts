import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { ProvinciaModel } from '../../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private baseUrlProvincia = 'http://localhost:8080/api/v1/provincias';

  constructor(private http: HttpClient) {}
  
  getAllProvincias(): Observable<ResponseModel<ProvinciaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<ProvinciaModel[]>>(`${this.baseUrlProvincia}`, { headers });
  }
  
  addProvincia(provincia: any): Observable<ResponseModel<ProvinciaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<ProvinciaModel>>(`${this.baseUrlProvincia}/crear`, provincia, { headers });
  }
  
  updateProvincia(provincia: any): Observable<ResponseModel<ProvinciaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<ProvinciaModel>>(`${this.baseUrlProvincia}/actualizar/${provincia.id}`, provincia, { headers });
  }
  
  deleteProvincia(provinciaId: number): Observable<ResponseModel<ProvinciaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<ProvinciaModel>>(`${this.baseUrlProvincia}/eliminar/${provinciaId}`, { headers });
  }
  
}
