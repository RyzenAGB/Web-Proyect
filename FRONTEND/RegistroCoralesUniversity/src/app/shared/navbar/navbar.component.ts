import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  usuario: { nombre: string; rol: string } | null = null;
  fechaHoraActual: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000); // Actualiza cada segundo
  }

  shouldShowNavbar(): boolean {
    const excludedRoutes = ['/login', '/register'];
    return !excludedRoutes.includes(this.router.url);
  }

  cerrarSesion() {
    this.authService.logout();
  }

  esProfesor(): boolean {
    return this.authService.esProfesor();
  }

  private actualizarFechaHora(): void {
    const ahora = new Date();
    this.fechaHoraActual = ahora.toLocaleString();
  }
}