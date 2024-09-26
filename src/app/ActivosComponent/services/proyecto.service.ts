import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { ProyectoModel } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private baseUrl = 'http://localhost:8080/api/v1/proyecto';

constructor(private http: HttpClient) {}

getAllProyectos(): Observable<ResponseModel<ProyectoModel[]>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Realizar la solicitud HTTP y devolver la respuesta directamente
  return this.http.get<ResponseModel<ProyectoModel[]>>(`${this.baseUrl}`, { headers });
}

addProyecto(proyecto: any): Observable<ResponseModel<ProyectoModel>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post<ResponseModel<ProyectoModel>>(`${this.baseUrl}/crear`, proyecto, { headers });
}

updateProyecto(proyecto: any): Observable<ResponseModel<ProyectoModel>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<ResponseModel<ProyectoModel>>(`${this.baseUrl}/actualizar/${proyecto.id}`, proyecto, { headers });
}

deleteProyecto(proyectoId: number): Observable<ResponseModel<ProyectoModel>> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete<ResponseModel<ProyectoModel>>(`${this.baseUrl}/eliminar/${proyectoId}`, { headers });
}

}
