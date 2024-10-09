import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { BloqueModel, DepartamentoModel } from '../../models/ubicacion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {
  private baseUrl = environment.apiUrl+'api/v1/bloque';

  constructor(private http: HttpClient) {}
  
  getAllBloques(): Observable<ResponseModel<BloqueModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<BloqueModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  addBloque(bloque: any): Observable<ResponseModel<BloqueModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<BloqueModel>>(`${this.baseUrl}/crear`, bloque, { headers });
  }
  
  updateBloque(bloque: any): Observable<ResponseModel<BloqueModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<BloqueModel>>(`${this.baseUrl}/actualizar/${bloque.id}`, bloque, { headers });
  }
  
  deleteBloque(bloqueId: number): Observable<ResponseModel<BloqueModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<BloqueModel>>(`${this.baseUrl}/eliminar/${bloqueId}`, { headers });
  }
  
  
}
