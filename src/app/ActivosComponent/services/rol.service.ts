import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { RolModel } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private baseUrl = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) {}

  getAllRols(): Observable<ResponseModel<RolModel[]>> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlSWQiOjEsInVzZXJJZCI6MSwic3ViIjoiYW5kcmVhQGdtYWlsLmNvbSIsImlhdCI6MTcyNzE5NjgyOSwiZXhwIjoxNzI3MjMyODI5fQ.W2y40T-GSkLG5EB11fApQURp4W0tc10XvYceStR3oAE';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<RolModel[]>>(`${this.baseUrl}`, { headers });
  }

  addRol(user: any): Observable<ResponseModel<RolModel>> {
    return this.http.post<ResponseModel<RolModel>>(`${this.baseUrl}/crear`, user);
  }
}
