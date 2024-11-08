import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { ProyectoModel } from '../models/proyecto.model';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private baseUrl = environment.apiUrl + 'api/v1/proyecto';

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

  // Obtener todos los proyectos
  getAllProyectos(): Observable<ResponseModel<ProyectoModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ResponseModel<ProyectoModel[]>>(`${this.baseUrl}`, { headers });
  }

  // Agregar un nuevo proyecto
  addProyecto(proyecto: any): Observable<ResponseModel<ProyectoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<ProyectoModel>>(`${this.baseUrl}/crear`, proyecto, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Proyecto creado con ID: ${proyecto.idProyecto}`).subscribe();
          }
        })
      );
  }

  // Actualizar un proyecto
  updateProyecto(proyecto: ProyectoModel): Observable<ResponseModel<ProyectoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<ProyectoModel>>(`${this.baseUrl}/actualizar/${proyecto.idProyecto}`, proyecto, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Proyecto actualizado con ID: ${proyecto.idProyecto}`).subscribe();
          }
        })
      );
  }

  // Eliminar un proyecto
  deleteProyecto(proyectoId: number): Observable<ResponseModel<ProyectoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<ProyectoModel>>(`${this.baseUrl}/eliminar/${proyectoId}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Proyecto eliminado con ID: ${proyectoId}`).subscribe();
          }
        })
      );
  }
}
