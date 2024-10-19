import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloModel } from '../models/modelo.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private baseUrlModelo = environment.apiUrl + 'api/v1/modelo';

  constructor(private http: HttpClient) {}

  // Obtener todos los modelos
  getAllModelos(): Observable<ResponseModel<ModeloModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<ModeloModel[]>>(`${this.baseUrlModelo}`, { headers });
  }

  // Agregar un nuevo modelo
  addModelo(modelo: ModeloModel): Observable<ResponseModel<ModeloModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<ModeloModel>>(`${this.baseUrlModelo}/crear`, modelo, { headers });
  }

  // Actualizar un modelo existente
  updateModelo(modelo: ModeloModel): Observable<ResponseModel<ModeloModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<ModeloModel>>(`${this.baseUrlModelo}/actualizar/${modelo.idModelo}`, modelo, { headers });
  }

  // Eliminar un modelo
  deleteModelo(modeloId: number): Observable<ResponseModel<ModeloModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<ModeloModel>>(`${this.baseUrlModelo}/eliminar/${modeloId}`, { headers });
  }
}
