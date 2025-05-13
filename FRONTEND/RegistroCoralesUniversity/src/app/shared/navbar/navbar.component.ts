import { Component } from '@angular/core';
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
export class NavbarComponent {
  
  constructor(private router: Router, private authService: AuthService ) {}

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

}
