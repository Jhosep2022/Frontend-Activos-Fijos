import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { AulaModel } from '../../models/ubicacion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private baseUrl = environment.apiUrl+'api/v1/aula';

  constructor(private http: HttpClient) {}
  
  getAllAulas(): Observable<ResponseModel<AulaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<AulaModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  addAula(aula: any): Observable<ResponseModel<AulaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<AulaModel>>(`${this.baseUrl}/crear`, aula, { headers });
  }
  
  updateAula(aula: any): Observable<ResponseModel<AulaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<AulaModel>>(`${this.baseUrl}/actualizar/${aula.id}`, aula, { headers });
  }
  
  deleteAula(aulaId: number): Observable<ResponseModel<AulaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<AulaModel>>(`${this.baseUrl}/eliminar/${aulaId}`, { headers });
  }
  
}
