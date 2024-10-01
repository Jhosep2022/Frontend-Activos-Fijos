import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { SucursalModel } from '../../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private baseUrlSucursal = 'http://localhost:8080/api/v1/sucursales';

  constructor(private http: HttpClient) {}
  
  getAllSucursales(): Observable<ResponseModel<SucursalModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<SucursalModel[]>>(`${this.baseUrlSucursal}`, { headers });
  }
  
  addSucursal(sucursal: any): Observable<ResponseModel<SucursalModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<SucursalModel>>(`${this.baseUrlSucursal}/crear`, sucursal, { headers });
  }
  
  updateSucursal(sucursal: any): Observable<ResponseModel<SucursalModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<SucursalModel>>(`${this.baseUrlSucursal}/actualizar/${sucursal.id}`, sucursal, { headers });
  }
  
  deleteSucursal(sucursalId: number): Observable<ResponseModel<SucursalModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<SucursalModel>>(`${this.baseUrlSucursal}/eliminar/${sucursalId}`, { headers });
  }
  
}
