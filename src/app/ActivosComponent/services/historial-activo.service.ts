import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { HistorialActivosModel } from '../models/historial-activos.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialActivoService {
  private baseUrlHistorial = environment.apiUrl + 'api/v1/historialActivos';

  constructor(private http: HttpClient) {}

  // Obtener todos los historiales activos
  getAllHistoriales(): Observable<ResponseModel<HistorialActivosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<HistorialActivosModel[]>>(`${this.baseUrlHistorial}`, { headers });
  }

  getHistorialActivoById(historialId: number): Observable<ResponseModel<HistorialActivosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<HistorialActivosModel[]>>(`${this.baseUrlHistorial}/porActivo/${historialId}`, { headers });
  }

  // Agregar un nuevo historial activo
  addHistorial(historial: any): Observable<ResponseModel<HistorialActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<HistorialActivosModel>>(`${this.baseUrlHistorial}/crear`, historial, { headers });
  }

  // Actualizar un historial activo
  updateHistorial(historial: any): Observable<ResponseModel<HistorialActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<HistorialActivosModel>>(`${this.baseUrlHistorial}/actualizar/${historial.id}`, historial, { headers });
  }

  // Eliminar un historial activo
  deleteHistorial(historialId: number): Observable<ResponseModel<HistorialActivosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<HistorialActivosModel>>(`${this.baseUrlHistorial}/eliminar/${historialId}`, { headers });
  }
}