import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { MunicipioModel } from '../../models/ubicacion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private baseUrlMunicipio = environment.apiUrl+'api/v1/municipios';

  constructor(private http: HttpClient) {}
  
  getAllMunicipios(): Observable<ResponseModel<MunicipioModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<MunicipioModel[]>>(`${this.baseUrlMunicipio}`, { headers });
  }
  
  addMunicipio(municipio: any): Observable<ResponseModel<MunicipioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<MunicipioModel>>(`${this.baseUrlMunicipio}/crear`, municipio, { headers });
  }
  
  updateMunicipio(municipio: any): Observable<ResponseModel<MunicipioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<MunicipioModel>>(`${this.baseUrlMunicipio}/actualizar/${municipio.id}`, municipio, { headers });
  }
  
  deleteMunicipio(municipioId: number): Observable<ResponseModel<MunicipioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<MunicipioModel>>(`${this.baseUrlMunicipio}/eliminar/${municipioId}`, { headers });
  }
  
}
