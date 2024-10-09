import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { PaisModel } from '../../models/ubicacion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private baseUrlPais = environment.apiUrl+'api/v1/pais';

  constructor(private http: HttpClient) {}
  
  getAllPaises(): Observable<ResponseModel<PaisModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<PaisModel[]>>(`${this.baseUrlPais}`, { headers });
  }
  
  addPais(pais: any): Observable<ResponseModel<PaisModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<PaisModel>>(`${this.baseUrlPais}/crear`, pais, { headers });
  }
  
  updatePais(pais: any): Observable<ResponseModel<PaisModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<PaisModel>>(`${this.baseUrlPais}/actualizar/${pais.id}`, pais, { headers });
  }
  
  deletePais(paisId: number): Observable<ResponseModel<PaisModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<PaisModel>>(`${this.baseUrlPais}/eliminar/${paisId}`, { headers });
  }
  
}
