import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { AreaModel } from '../models/area.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private baseUrl = environment.apiUrl+'api/v1/area';

  constructor(private http: HttpClient) {}
  
  getAllAreas(): Observable<ResponseModel<AreaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<AreaModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  addArea(area: any): Observable<ResponseModel<AreaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<AreaModel>>(`${this.baseUrl}/crear`, area, { headers });
  }
  
  updateArea(area: any): Observable<ResponseModel<AreaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<AreaModel>>(`${this.baseUrl}/actualizar/${area.id}`, area, { headers });
  }
  
  deleteArea(areaId: number): Observable<ResponseModel<AreaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<AreaModel>>(`${this.baseUrl}/eliminar/${areaId}`, { headers });
  }
  
}
