import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaModel } from '../models/empresa.model';
import { ResponseModel } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = environment.apiUrl + 'api/v1/empresa';

  constructor(
    private http: HttpClient,
    private jwtDecoderService: JwtdecoderService,
    private userServiceService: UserServiceService
  ) {}

  private obtenerUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecoderService.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }

  // Obtener todas las empresas
  getAllEmpresas(): Observable<ResponseModel<EmpresaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<EmpresaModel[]>>(`${this.baseUrl}`, { headers });
  }

  // Agregar una nueva empresa
  addEmpresa(empresa: any): Observable<ResponseModel<EmpresaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<EmpresaModel>>(`${this.baseUrl}/crear`, empresa, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Empresa creada con ID: ${empresa.id}`).subscribe();
          }
        })
      );
  }

  // Actualizar una empresa
  updateEmpresa(empresa: any): Observable<ResponseModel<EmpresaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<EmpresaModel>>(`${this.baseUrl}/actualizar/${empresa.id}`, empresa, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Empresa actualizada con ID: ${empresa.id}`).subscribe();
          }
        })
      );
  }

  // Eliminar una empresa
  deleteEmpresa(empresaId: number): Observable<ResponseModel<EmpresaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<EmpresaModel>>(`${this.baseUrl}/eliminar/${empresaId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Empresa eliminada con ID: ${empresaId}`).subscribe();
          }
        })
      );
  }
}
