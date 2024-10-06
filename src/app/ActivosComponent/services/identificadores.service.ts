import { Injectable } from '@angular/core';
import { IdentificadoresModel } from '../models/identificadores.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class IdentificadoresService {
  private baseUrlIdentificadores = 'http://localhost:8080/api/v1/identificador';

  constructor(private http: HttpClient) {}
  
  // Obtener todos los identificadores
  getAllIdentificadores(): Observable<ResponseModel<IdentificadoresModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<IdentificadoresModel[]>>(`${this.baseUrlIdentificadores}`, { headers });
  }
  
  // Agregar un nuevo identificador
  addIdentificador(identificador: any): Observable<ResponseModel<IdentificadoresModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<IdentificadoresModel>>(`${this.baseUrlIdentificadores}/crear`, identificador, { headers });
  }
  
  updateIdentificador(identificador: any): Observable<ResponseModel<IdentificadoresModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<IdentificadoresModel>>(`${this.baseUrlIdentificadores}/actualizar/${identificador.id}`, identificador, { headers });
  }
  
  deleteIdentificador(identificadorid: number): Observable<ResponseModel<IdentificadoresModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<IdentificadoresModel>>(`${this.baseUrlIdentificadores}/eliminar/${identificadorid}`, { headers });
  }
  
}
