import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actividad {
  fecha: string;
  nombre: string;
  descripcion: string;
  horas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ActividadEstudiantes {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener un estudiante por ID
  getActividadesById(shard: string, id: number): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/${shard}/actividades/${id}`);
  }

}
