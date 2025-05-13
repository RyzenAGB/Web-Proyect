import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  usuario: { nombre: string; rol: string } | null = null;
  fechaHoraActual: string = '';
   private usuarioSubscription!: Subscription;
   private routerSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario
    this.usuarioSubscription = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario; // Actualizar usuario cuando cambie
    });

    // Suscribirse a los eventos de navegación
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.usuario = this.authService.obtenerUsuario(); // Actualizar usuario al cambiar de ruta
      });


    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000); // Actualiza cada segundo
  }

    ngOnDestroy(): void {
    // Limpiar suscripciones para evitar fugas de memoria
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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