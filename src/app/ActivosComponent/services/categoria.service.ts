import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categorias.model';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './user-service.service';
import { JwtdecoderService } from './jwtdecoder.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrlCategoria = environment.apiUrl + 'api/v1/categorias';

  constructor(
    private http: HttpClient,
    private jwtDecoderService: JwtdecoderService,
    private userServiceService: UserServiceService // Inyecta UserServiceService
  ) {}

  private obtenerUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtDecoderService.decodeToken(token);
      return decodedToken ? decodedToken.userId : null;
    }
    return null;
  }

  // Obtener todas las categorías
  getAllCategorias(): Observable<ResponseModel<CategoriaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<CategoriaModel[]>>(`${this.baseUrlCategoria}`, { headers });
  }

  // Agregar una nueva categoría
  addCategoria(categoria: any): Observable<ResponseModel<CategoriaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.post<ResponseModel<CategoriaModel>>(`${this.baseUrlCategoria}/crear`, categoria, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'CREAR', `Categoría creada con ID: ${categoria.idCategoria}`).subscribe();
          }
        })
      );
  }

  // Actualizar una categoría
  updateCategoria(categoria: CategoriaModel): Observable<ResponseModel<CategoriaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.put<ResponseModel<CategoriaModel>>(`${this.baseUrlCategoria}/actualizar/${categoria.idCategoria}`, categoria, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ACTUALIZAR', `Categoría actualizada con ID: ${categoria.idCategoria}`).subscribe();
          }
        })
      );
  }

  // Eliminar una categoría
  deleteCategoria(categoriaid: number): Observable<ResponseModel<CategoriaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const userId = this.obtenerUserId();

    return this.http.delete<ResponseModel<CategoriaModel>>(`${this.baseUrlCategoria}/eliminar/${categoriaid}`, { headers })
      .pipe(
        tap(() => {
          if (userId) {
            this.userServiceService.logAuditoria(userId, 'ELIMINAR', `Categoría eliminada con ID: ${categoriaid}`).subscribe();
          }
        })
      );
  }
}
