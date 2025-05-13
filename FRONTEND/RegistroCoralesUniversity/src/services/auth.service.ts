import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  private usuarioSubject = new BehaviorSubject<any>(this.obtenerUsuario());
  usuario$ = this.usuarioSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { correo, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
        })
      );
  }

  register(usuario: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, usuario);  
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    const datos = localStorage.getItem('usuario');
    return datos ? JSON.parse(datos) : null;
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

    esProfesor(): boolean {
    const user = this.obtenerUsuario();
    return user?.rol === 'profesor';
  }


}
