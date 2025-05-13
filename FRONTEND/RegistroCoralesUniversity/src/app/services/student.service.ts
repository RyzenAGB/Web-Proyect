import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:3000/estudiantes';

  constructor(private http: HttpClient) {}

  getEstudiantes() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  crearEstudiante(estudiante: any) {
    return this.http.post<any>(this.apiUrl, estudiante);
  }

  eliminarEstudiante(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarEstudiante(id: number, estudiante: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, estudiante);
  }
  
  getEstudiantesDetallado(){
    return this.http.get<any[]>(`${this.apiUrl}-detallado`);
  }

}
