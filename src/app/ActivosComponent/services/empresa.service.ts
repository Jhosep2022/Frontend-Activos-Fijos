import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaModel } from '../models/empresa.model';
import { ResponseModel } from '../models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080/api/v1/empresa';

constructor(private http: HttpClient) {}

getAllEmpresas(): Observable<ResponseModel<EmpresaModel[]>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Realizar la solicitud HTTP y devolver la respuesta directamente
  return this.http.get<ResponseModel<EmpresaModel[]>>(`${this.baseUrl}`, { headers });
}

addEmpresa(empresa: any): Observable<ResponseModel<EmpresaModel>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post<ResponseModel<EmpresaModel>>(`${this.baseUrl}/crear`, empresa, { headers });
}

updateEmpresa(empresa: any): Observable<ResponseModel<EmpresaModel>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<ResponseModel<EmpresaModel>>(`${this.baseUrl}/actualizar/${empresa.id}`, empresa, { headers });
}

deleteEmpresa(empresaId: number): Observable<ResponseModel<EmpresaModel>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete<ResponseModel<EmpresaModel>>(`${this.baseUrl}/eliminar/${empresaId}`, { headers });
}

}
