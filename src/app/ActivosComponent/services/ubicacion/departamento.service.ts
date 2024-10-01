import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentoModel } from '../../models/ubicacion.model';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private baseUrlDepartamento = 'http://localhost:8080/api/v1/departamentos';

  constructor(private http: HttpClient) {}
  
  getAllDepartamentos(): Observable<ResponseModel<DepartamentoModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<DepartamentoModel[]>>(`${this.baseUrlDepartamento}`, { headers });
  }
  
  addDepartamento(departamento: any): Observable<ResponseModel<DepartamentoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<DepartamentoModel>>(`${this.baseUrlDepartamento}/crear`, departamento, { headers });
  }
  
  updateDepartamento(departamento: any): Observable<ResponseModel<DepartamentoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<DepartamentoModel>>(`${this.baseUrlDepartamento}/actualizar/${departamento.id}`, departamento, { headers });
  }
  
  deleteDepartamento(departamentoId: number): Observable<ResponseModel<DepartamentoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<DepartamentoModel>>(`${this.baseUrlDepartamento}/eliminar/${departamentoId}`, { headers });
  }
  
}
