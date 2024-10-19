import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { JwtdecoderService } from './jwtdecoder.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = environment.apiUrl + 'api/v1/usuario';

  constructor(private http: HttpClient, private jwtDecoderService: JwtdecoderService) {}


  getAllUsers(): Observable<ResponseModel<UserModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<UserModel[]>>(`${this.baseUrl}/todos`, { headers });
  }


  addUser(user: any): Observable<UserModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<UserModel>(`${this.baseUrl}/crear`, user, { headers });
  }


  login(user: any): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.baseUrl}/login`, user);
  }


  updateUser(user: any): Observable<ResponseModel<UserModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<UserModel>>(`${this.baseUrl}/actualizar/${user.id}`, user, { headers });
  }


  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/eliminar/${userId}`, { headers });
  }


  getUserProfile(): Observable<ResponseModel<UserModel>> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const decodedToken = this.jwtDecoderService.decodeToken(token);
    const userId = decodedToken ? decodedToken.userId : null;

    if (!userId) {
      throw new Error('ID de usuario no encontrado en el token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<UserModel>>(`${this.baseUrl}/${userId}`, { headers });
  }

}
