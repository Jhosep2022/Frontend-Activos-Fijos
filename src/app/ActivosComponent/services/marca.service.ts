import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarcaModel } from '../models/marca.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private baseUrlMarca = environment.apiUrl + 'api/v1/marca';

  constructor(private http: HttpClient) {}

  // Obtener todas las marcas
  getAllMarcas(): Observable<ResponseModel<MarcaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<MarcaModel[]>>(`${this.baseUrlMarca}`, { headers });
  }

  // Agregar una nueva marca
  addMarca(marca: MarcaModel): Observable<ResponseModel<MarcaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<MarcaModel>>(`${this.baseUrlMarca}/crear`, marca, { headers });
  }

  // Actualizar una marca existente
  updateMarca(marca: MarcaModel): Observable<ResponseModel<MarcaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<MarcaModel>>(`${this.baseUrlMarca}/actualizar/${marca.idMarca}`, marca, { headers });
  }

  // Eliminar una marca
  deleteMarca(marcaId: number): Observable<ResponseModel<MarcaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<MarcaModel>>(`${this.baseUrlMarca}/eliminar/${marcaId}`, { headers });
  }
}
