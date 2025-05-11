import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces para tipar los datos recibidos
export interface Kpis {
  totalEstudiantes: number;
  totalCursos: number;
  totalProfesores: number;
}

export interface RegistroPorMes {
  mes: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000'; // Asegúrate de que coincide con tu servidor

  constructor(private http: HttpClient) {}

  getKpis(): Observable<Kpis> {
    return this.http.get<Kpis>(`${this.apiUrl}/kpis`);
  }

  getRegistrosPorMes(): Observable<RegistroPorMes[]> {
    return this.http.get<RegistroPorMes[]>(`${this.apiUrl}/registros`);
  }
}
