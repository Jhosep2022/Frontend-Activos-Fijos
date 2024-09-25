import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://localhost:8080/api/v1/usuario';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ResponseModel<UserModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Realizar la solicitud HTTP y devolver la respuesta directamente
    return this.http.get<ResponseModel<UserModel[]>>(`${this.baseUrl}/todos`, { headers });
  }

  addUser(user: any): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/crear`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.baseUrl}/login`, user);
  }
  
}
