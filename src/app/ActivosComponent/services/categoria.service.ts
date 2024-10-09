import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categorias.model';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrlCategoria = environment.apiUrl+'api/v1/categorias';

  constructor(private http: HttpClient) {}
  
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
    return this.http.post<ResponseModel<CategoriaModel>>(`${this.baseUrlCategoria}/crear`, categoria, { headers });
  }
  
  updateCategoria(categoria: any): Observable<ResponseModel<CategoriaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<CategoriaModel>>(`${this.baseUrlCategoria}/actualizar/${categoria.id}`, categoria, { headers });
  }
  
  deleteCategoria(categoriaid: number): Observable<ResponseModel<CategoriaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<CategoriaModel>>(`${this.baseUrlCategoria}/eliminar/${categoriaid}`, { headers });
  }
  
}
