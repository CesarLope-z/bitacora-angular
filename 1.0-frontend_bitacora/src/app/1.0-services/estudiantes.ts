import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  nombre: string;
  carne: string;
  carrera: string;
  telefono: string;

  fechaInicio: string;
  fechaFinalizacion: string;
  cantidadHoras: number;

  coordUDB: string;
  institucion: string;
  coordInst: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener un estudiante por ID
  getEstudianteById(shard: string, id: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/${shard}/estudiantes/${id}`);
  }

  // Si después quieres todos los estudiantes:
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }
}
